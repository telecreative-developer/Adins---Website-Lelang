import React, { Component } from "react";
import { Redirect } from "react-router";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing/index";
import Tata from "./TataCara/index";
import Jadwal from "./Jadwal/index";
import ListLelang from "./ListLelang/index";
import ViewCar from "./ViewCar/index";
import Lokasi from "./Lokasi/index";
import PengertianLelang from "./PengertianLelang/index";
import PeraturanLelang from "./PeraturanLelang/index";
import TentangKami from "./TentangKami/index";
import Kontak from "./Kontak/index";
// import Login from "./Login/index";
// import RegisterChoose from "./RegisterChoose/index";
// import Register from "./Register/index";

//Register list route
export class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/pengertian-lelang" component={PengertianLelang} />
          <Route exact path="/peraturan-lelang" component={PeraturanLelang} />
          <Route exact path="/tatacara-lelang" component={Tata} />
          <Route exact path="/jadwal" component={Jadwal} />
          <Route exact path="/lokasi" component={Lokasi} />
          <Route exact path="/list-lelang/:id" component={ListLelang} />
          <Route exact path="/view-car/:id" component={ViewCar} />
          <Route exact path="/tentang-kami" component={TentangKami} />
          <Route exact path="/kontak" component={Kontak} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/register-choose" component={RegisterChoose} /> */}
          {/* <Route exact path="/register" component={Register} /> */}
          <Route component={noMatch} />
        </Switch>
      </main>
    );
  }
}

//func redirect to home when link is invalid
const noMatch = ({ location }) => (
  <Redirect
    to={{
      pathname: "/"
    }}
  />
);

export default Main;
