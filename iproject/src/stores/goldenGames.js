import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const toast = useToast();

export const useGgStore = defineStore("gg", {
  state: () => ({
    baseUrl: "http://localhost:3000",
    listGames: [],
    totalPages: 0,
    currentPage: 1,
    showPage: [],
    collections: [],
    detailGame: {}
  }),
  actions: {
    async register(data) {
      try {
        const signUp = await axios.post(this.baseUrl + "/register", data);
        this.router.push("/login")
        toast.success(`Hello user ${signUp.data.email}, you can login now`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async googleLogin(response) {
      try {
        const login = await axios.post(
          this.baseUrl + "/login-google",
          {},
          {
            headers: {
              google_token: response.credential,
            },
          }
        );
        localStorage.access_token = login.data.access_token;
        this.router.push("/");
        toast.success("Welcome to GG");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async getLogin(data) {
      try {
        const user = await axios.post(this.baseUrl + "/login", data);

        localStorage.access_token = user.data.access_token;
        this.router.push("/");
        toast.success("Welcome to GG");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    getLogout() {
      if (localStorage.access_token) {
        localStorage.clear();
        this.router.push("/login");
        toast.success("See you later champ");
      }
    },
    async fetchAllFreeGames(query){
      try {
        let addQuery = ''

        query.page ? (addQuery = 'page=' + query.page) : ''
        query.name ? (addQuery = 'name=' + query.name) : ''
        if (query.page && query.name) {
          addQuery = 'page=' + query.page + '&name=' + query.name
        }
        
        const { data } = await axios.get(this.baseUrl + '/?' + addQuery, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.listGames = data.data
        this.totalPages = data.totalPage
        this.currentPage = data.currentPage
        console.log(data.currentPage)
        console.log(data.totalPage)
        let showPage = []
        if(+data.currentPage > 1 && +data.currentPage < +data.totalPage ){
          showPage.push(+data.currentPage - 1)
          showPage.push(+data.currentPage)
          showPage.push(+data.currentPage + 1)
        }else if(+data.currentPage === 1) {
          showPage = [1,2,3]
        } else if(+data.currentPage === +data.totalPage){
          showPage.push(+data.totalPage - 2)
          showPage.push(+data.totalPage - 1)
          showPage.push(+data.totalPage)
        }
        this.showPage = showPage
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },
    async addCollections(game){
      try {
        const add  = await axios.post(this.baseUrl + '/collections', game, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/collections')
        toast.success(add.data.title + `added to collections`)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async fetchCollections(){
      try {
        const { data } = await axios.get(this.baseUrl + '/collections', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.collections = data
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async changeStatus(data){
      try {
        const update = await axios.patch(this.baseUrl + '/collections', data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        toast.success("Status updated")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },
    async gamesById(id){
      try {
        const { data } = await axios.get(this.baseUrl + '/collections/' + id, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.detailGame = data
        this.router.push('/collections/' + id)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  },
});
