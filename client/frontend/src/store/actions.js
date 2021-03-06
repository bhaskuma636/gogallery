
import axios from 'axios';
import {config} from './index';
export const galleryActions = {
  //getAll,
  getAllPhotos,
  getAllCollections,
  getProfile
};

function getAllPhotos(){
  return dispatch => {
      
      axios.get(config.baseUrl+"/photos").then((response)=>{
          dispatch(setPhotosDetails(response.data));
      }).catch((err)=>{})
  }
}
function getAllCollections(){
  return dispatch => {
      axios.get(config.baseUrl+"/albums").then((response)=>{
        dispatch(setCollectionsDetails(response.data));
      }).catch((err)=>{console.log(err)})
  }
}
function getProfile(){
  return dispatch => {
      axios.get(config.baseUrl+"/profile").then((response)=>{
          dispatch(setProfileDetails(response.data));
      }).catch((err)=>{})
  }
}


function setPhotosDetails(photos){
  return{
      type: "PHOTOS_RECEIVED",
      photos: photos,
  }
}

function setProfileDetails(profile){
  return{
      type: "PROFILE_RECEIVED",
      profile: profile,
  }
}

function setCollectionsDetails(collections){
  return{
      type: "COLLECTIONS_RECEIVED",
      collections: collections,
  }
}