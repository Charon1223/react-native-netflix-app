import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Banner from "./components/Banner";
import requests from "./api/requests";
import Row from "./components/Row";
import { useState } from "react";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openModal(movie) {
    setIsModalVisible(true);
    setSelectedMovie(movie);
  }

  function closeModal(movie) {
    setIsModalVisible(false);
    setSelectedMovie(null);
  }

  return (
    <View style={styles.container}>
      <MovieDetail
        isModalVisible={isModalVisible}
        movie={selectedMovie}
        closeModal={closeModal}
      />
      <ScrollView style={styles.scrollView}>
        <Banner fetchUrl={requests.fetchNowPlaying} />
        <Row
          onOpenModal={openModal}
          title="Trending"
          fetchUrl={requests.fetchTrending}
          isLargeRow
        />
        <Row
          onOpenModal={openModal}
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
        />
        <Row
          onOpenModal={openModal}
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
        />
        <Row
          onOpenModal={openModal}
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  scrollView: {
    width: "100%",
  },
});
