import { setLoading, setFailed, setSuccess } from "./processor";
import axios from "axios";
import { server } from "../env/server";

import {
  RECEIVED_PRODUCT_RECOMEND,
  RECEIVED_PRODUCT_BY_EVENT,
  RECEIVED_PRODUCT_DETAIL,
  RECEIVED_IMAGES_PRODUCT,
  RECEIVED_IMAGE_EVERY_PRODUCT
} from "../constants/processor";
import { receivedimageeveryproduct } from "../reducers/getProduct";

export const fetchProductRecomended = tokenId => {
  return async dispatch => {
    await dispatch(setLoading(true, "LOADING_FETCH_RECOMEND"));
    try {
      const response = await axios.post(`${server}/api/am/get/command`, {
        tokenId: tokenId,
        uriCode: "LOT_SEARCH",
        param: {
          draw: 1,
          columns: [
            {
              data: "UnitGrade",
              name: null,
              searchable: true,
              orderable: true,
              search: {
                value: "A",
                regex: false
              }
            }
          ],
          order: [
            {
              column: 0,
              dir: "asc"
            }
          ],
          start: 0,
          search: {
            value: null,
            regex: false
          },
          extra: {
            SearchType: "SEARCHBYUNITSPEC",
            UnitTypeCode: "CAR",
            SpecFiltersJson: "{}"
          }
        }
      });
      const data = await response.data;
      console.log("hasil product recomend", data.data);
      console.log(
        "hasil merek ",
        data.data.map(data => data.AuctionLot.AuctionLotId)
      );
      await dispatch(receivedProductRecomend(data.data));
      await dispatch(
        setSuccess(
          true,
          "SUCCESS_FETCH_RECOMEND",
          "berhasil mendapatkan product recomend"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_RECOMEND"));
    } catch (e) {
      console.log("fetch recomend", e);
      await dispatch(
        setFailed(
          true,
          "FAILED_FETCH_RECOMEND",
          "gagal mendapatkan product recomend"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_RECOMEND"));
    }
  };
};

const receivedProductRecomend = data => {
  return {
    type: RECEIVED_PRODUCT_RECOMEND,
    payload: data
  };
};

export const fetchProductByEvent = (tokenId, eventId) => {
  return async dispatch => {
    await dispatch(setLoading(true, "LOADING_FETCH_BY_EVENT"));
    try {
      const response = await axios.post(`${server}/api/am/get/command`, {
        tokenId: tokenId,
        uriCode: "LOT_SEARCH",
        param: {
          draw: 1,
          columns: [
            {
              data: "AuctionLot.AuctionEvent.AuctionEventId",
              name: null,
              searchable: true,
              orderable: true,
              search: {
                value: `${eventId}`,
                regex: false
              }
            }
          ],
          order: [
            {
              column: 0,
              dir: "asc"
            }
          ],
          start: 0,
          search: {
            value: null,
            regex: false
          },
          extra: {
            SearchType: "SEARCHBYUNITSPEC",
            UnitTypeCode: "CAR",
            SpecFiltersJson: "{}"
          }
        }
      });
      const data = await response.data;
      console.log("hasil product by event", data.data);
      await dispatch(receivedProductByEvent(data.data));
      await dispatch(
        setSuccess(
          true,
          "SUCCESS_FETCH_BY_EVENT",
          "berhasil mendapatkan product by event"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_BY_EVENT"));
    } catch (e) {
      console.log("fetch by event", e);
      await dispatch(
        setFailed(
          true,
          "FAILED_FETCH_BY_EVENT",
          "gagal mendapatkan product by event"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_BY_EVENT"));
    }
  };
};

const receivedProductByEvent = data => {
  return {
    type: RECEIVED_PRODUCT_BY_EVENT,
    payload: data
  };
};

let imageArray = [];

export const fetchProductDetail = (tokenId, lotId) => {
  return async dispatch => {
    await dispatch(setLoading(true, "LOADING_FETCH_DETAIL_PRODUCT"));
    try {
      const response = await axios.post(
        `${server}/api/am/get/auctionlotbundle`,
        {
          tokenId: tokenId,
          param: {
            auctionLotId: lotId
          }
        }
      );
      const data = await response.data;
      console.log("hasil product detail", data);
      await dispatch(receivedProductDetail(data));
      await dispatch(receivedImages(data.auctionLotUnits[0].physicalImages));
      await dispatch(
        receivedImage(data.auctionLotUnits[0].physicalImages[2].imageUri)
      );
      await dispatch(
        setSuccess(
          true,
          "SUCCESS_FETCH_DETAIL_PRODUCT",
          "berhasil mendapatkan product detail"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_DETAIL_PRODUCT"));
    } catch (e) {
      console.log("fetch product detail", e);
      await dispatch(
        setFailed(
          true,
          "FAILED_FETCH_DETAIL_PRODUCT",
          "gagal mendapatkan product detail"
        )
      );
      await dispatch(setLoading(false, "LOADING_FETCH_DETAIL_PRODUCT"));
    }
  };
};

const receivedProductDetail = data => {
  return {
    type: RECEIVED_PRODUCT_DETAIL,
    payload: data
  };
};

const receivedImages = data => {
  return {
    type: RECEIVED_IMAGES_PRODUCT,
    payload: data
  };
};

const receivedImage = data => {
  // imageArray = []
  const imgArr = imageArray.push(data);
  console.log(imageArray.sort());
  return {
    type: RECEIVED_IMAGE_EVERY_PRODUCT,
    payload: imageArray
  };
};
