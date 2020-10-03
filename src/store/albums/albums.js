import { API, graphqlOperation } from "aws-amplify";
import { createAlbum as createAlbumMutation } from "@/graphql/mutations";
import {
  getAlbum as getAlbumQuery,
  listAlbums as listAlbumsQuery,
} from "@/graphql/queries";

export const albumInfo = {
  namespaced: true,
  state: {
    error: null,
    albums: null,
  },
  mutations: {
    setAlbum(state, payload) {
      state.album = payload;
    },
  },
  actions: {
    async createAlbum(_, newAlbum) {
      try {
        return await API.graphql(
          graphqlOperation(createAlbumMutation, { input: newAlbum })
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getAlbum(_, albumId) {
      return await API.graphql(
        graphqlOperation(getAlbumQuery, { id: albumId })
      );
    },
    async getAlbumsData({ commit }) {
      const albumsData = await API.graphql;
      graphqlOperation(listAlbumsQuery, {})();
      commit("setAlbums", albumsData.data.listAlbums.items);
    },
  },
  getters: {
    albums(state) {
      return state.albums;
    },
  },
};
