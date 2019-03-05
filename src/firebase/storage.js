import {storage} from './firebase';

// User API
const imageMap = {};
export const getImageUrl = (storageLocation) => {
    // Create a reference from a Google Cloud Storage URI
    if (imageMap[storageLocation]) {
        return Promise.resolve(imageMap[storageLocation]);
    }
    var gsReference = storage.refFromURL(storageLocation)

    // Get the download URL
    return gsReference.getDownloadURL().then(function(url) {
        imageMap[storageLocation] = url;
        return url;
    }).catch(function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/object-not-found':
            // File doesn't exist
            break;
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;
        case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        default: 
            break;
    }
    return null;
    });
}

export const uploadImage = (image, metadata) => {
    // Create a root reference
    var ref = storage.ref();
    var imgRef = ref.child('eventImages/' + image.name);
    return imgRef.put(image, metadata);
      
}