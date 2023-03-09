import http from "../http-common";

class TweetsDataService {
    getAll() {
      return http.get("/tweets");
    }
}
  export default new TweetsDataService();
 