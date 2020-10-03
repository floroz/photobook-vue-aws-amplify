import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  createAlbum as createAlbumMutation,
  createPhoto as createPhotoMutation,
} from "@/graphql/mutations";
import {
  getAlbum as getAlbumQuery,
  listAlbums as listAlbumsQuery,
} from "@/graphql/queries";
import { v4 as uuid } from "uuid";
import awsconfig from "@/aws-exports";

export const albumInfo = {
  namespaced: true,
  state: {
    error: null,
    albums: null,
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    async createAlbum({ dispatch }, newAlbum) {
      try {
        await API.graphql(
          graphqlOperation(createAlbumMutation, { input: newAlbum })
        );
        dispatch("getAlbumsData");
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
      const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
      commit("setAlbums", albumsData.data.listAlbums.items);
    },
    async createPhoto(_, data) {
      const {
        aws_user_files_s3_bucket_region: region,
        aws_user_files_s3_bucket: bucket,
      } = awsconfig;
      const { file, type: mimeType, id } = data;
      const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const photoId = uuid();
      const key = `images/${photoId}.${extension}`;
      const inputData = {
        id: photoId,
        photoAlbumId: id,
        contentType: mimeType,
        fullsize: {
          region,
          key,
          bucket,
        },
      };

      try {
        await Storage.put(key, file, {
          level: "protected",
          contentType: mimeType,
          metadata: {
            albumId: id,
            photoId,
          },
        });
        await API.graphql(
          graphqlOperation(createPhotoMutation, { input: inputData })
        );
        return Promise.resolve("Success");
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
  },
  getters: {
    albums(state) {
      return state.albums;
    },
  },
};
