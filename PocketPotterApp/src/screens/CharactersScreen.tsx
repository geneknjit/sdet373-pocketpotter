import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Character = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  image: string;
  birthdate: string;
  children: string[];
};

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://potterapi-fedeperin.vercel.app/en/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Character }) => {
    const isExpanded = expanded === item.nickname;

    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          setExpanded(isExpanded ? null : item.nickname)
        }
      >
        <Text style={styles.nickname}>{item.nickname}</Text>

        {isExpanded && (
          <View style={styles.details}>
            <Text>Full Name: {item.fullName}</Text>
            <Text>House: {item.hogwartsHouse}</Text>
            <Text>Birthdate: {item.birthdate}</Text>
            <Text>
              Children: {item.children?.length ? item.children.join(", ") : "None"}
            </Text>

            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : null}
          </View>
        )}
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.nickname}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  nickname: {
    fontSize: 18,
    fontWeight: "600",
  },
  details: {
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
