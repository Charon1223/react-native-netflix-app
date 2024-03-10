import {
  Button,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { BASE_URL } from "./Banner";
import DetailsText from "./DetailsText";
import { LinearGradient } from "expo-linear-gradient";

const MovieDetail = ({ isModalVisible, movie, closeModal }) => {
  if (!movie) return null;

  const [details, setDetails] = useState(null);

  const type = (movie.media_type = "movie" || !movie.media_type)
    ? "movie"
    : "tv";

  const MovieDetailPath = `/${type}/${movie.id}?append_to_response=credits`;

  useEffect(() => {
    async function fetchDetail() {
      const response = await axiosInstance.get(MovieDetailPath);
      setDetails(response.data);
    }
    fetchDetail();
  }, []);

  return (
    <Modal visible={isModalVisible}>
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={{
              uri: `${BASE_URL}${movie.backdrop_path}`,
            }}
            style={styles.backDrop}
          >
            <LinearGradient
              colors={["transparent", "rgba(37,37,37,0.7)", "#171717"]}
              style={styles.radialGradient}
            />
          </ImageBackground>
          <DetailsText
            title={movie?.title || movie?.original_title || movie?.name}
            description={movie?.overview}
            genres={details?.genres}
          />
          <Button title="Close" onPress={closeModal} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  backDrop: {
    width: "100%",
    height: 450,
    objectFit: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  radialGradient: {
    position: "absolute",
    height: 180,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

export default MovieDetail;
