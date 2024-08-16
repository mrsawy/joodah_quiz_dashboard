import { useState, useEffect } from 'react';
import { Gallery } from 'react-grid-gallery';
// import AddIcon from '@mui/icons-material/Add';

// import Lightbox from 'yet-another-react-lightbox'; // , { useLightboxState }
import { useDispatch, useSelector } from 'react-redux';

import {
  //  deleteImage,
  getImages,
  deleteImage,
  setImageIsSet,
  setImageIsDeleted,
} from './../../store/images/imageSlice';
import DeleteButton from './../../components/DeleteButton';
import Swal from 'sweetalert2';

export default function ImageGallery() {
  // const { currentSlide } = useLightboxState();

  const { images, imagesIsSet, isError, message, imagesIsDeleted } =
    useSelector((state) => state.images);
  const [imgsState, setImgState] = useState(images);
  const slides = images.map(({ path, width = `auto`, height = `auto` }) => ({
    src: path,
    width,
    height,

    // customOverlay:(<DeleteButton className="yarl__button z-10 opacity-100" />)
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  useEffect(() => {
    setImgState(images);
  }, [images]);

  useEffect(() => {
    if (imagesIsSet) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Image Is Added Successfully  👍',
      }).then(() => {
        dispatch(setImageIsSet(false));
      });
    }
    if (imagesIsDeleted) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Image Is Deleted Successfully  👍',
      }).then(() => {
        dispatch(setImageIsDeleted(false));
      });
    }

    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
      });
    }
  }, [imagesIsSet, dispatch, isError, message, imagesIsDeleted]);

  const [index, setIndex] = useState(-1);

  const handleClick = (i, item) => {
    setIndex(i);
  };

  const galleyFunction = (img, ind) => ({
    src: img?.path,
    width: `auto`,
    height: `20%`,
    id: img?._id,
  });

  return (
    <div>
      <Gallery
        images={imgsState.map(galleyFunction)}
        onClick={handleClick}
        enableImageSelection={false}
      />
    </div>
  );
}
