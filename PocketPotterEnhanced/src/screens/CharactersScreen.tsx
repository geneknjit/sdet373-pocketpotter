
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Character = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  image: string;
  birthdate: string;
  children: string[];
};

const houseColors: Record<string, string> = {
  Gryffindor: "#740001",
  Slytherin: "#1A472A",
  Ravenclaw: "#0E1A40",
  Hufflepuff: "#FFDB00",
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
      .catch(() => setLoading(false));
  }, []);

  const toggleExpand = (nickname: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === nickname ? null : nickname);
  };

  const renderItem = ({ item }: { item: Character }) => {
    const isExpanded = expanded === item.nickname;
    const houseColor = houseColors[item.hogwartsHouse] || "#333";

    return (
      <Pressable
        style={[styles.card, { borderLeftColor: houseColor }]}
        onPress={() => toggleExpand(item.nickname)}
      >
        <Text style={styles.nickname}>{item.nickname}</Text>

        {isExpanded && (
          <View style={styles.details}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : null}

            <Text style={styles.fullName}>{item.fullName}</Text>
            <Text style={[styles.house, { color: houseColor }]}>
              {item.hogwartsHouse}
            </Text>
            <Text style={styles.info}>Born: {item.birthdate}</Text>
            <Text style={styles.info}>
              Children: {item.children?.length ? item.children.join(", ") : "None"}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5d742" />
        <Text style={{ marginTop: 10, color: "#fff" }}>
          Summoning characters...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.nickname}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16, backgroundColor: "#0E0E1A" }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c2b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  details: {
    marginTop: 12,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f5d742",
  },
  house: {
    fontSize: 16,
    marginBottom: 6,
  },
  info: {
    color: "#ccc",
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E0E1A",
  },
});
