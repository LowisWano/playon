import { Text, ScrollView, StyleSheet } from "react-native";
import {
  PlayOnUsers,
} from "./sub-components/PlayOnUsers";
import { NotFoundResult } from "./sub-components/NotFoundResult";
import { RoomUserData } from "../../types/entities/UserEntity";

type SearchNameResultProps = {
  route: string;
  searchName: string | null;
  searchLoading: boolean;
  searchResult: RoomUserData[] | string | null;
  contactsData: RoomUserData[] | null;
  setAddUsers?: React.Dispatch<React.SetStateAction<RoomUserData[]>>;
};

export default function SearchNameResult(props: SearchNameResultProps) {
  const { route, searchName, searchResult, contactsData, setAddUsers, searchLoading } = props;

  console.log(contactsData, "CONTACTS DATA");
  console.log(searchResult, "SEARCH RESULT");
  
  return (
    <ScrollView style={{ marginTop: 16 }}>
      <Text style={style.labelText}>
        {searchName && "Search Result"}
        {!searchName && route === "create-message"
          ? "Recent Contacts"
          : !searchName
          ? "In Contacts"
          : null}
      </Text>
      {!searchLoading ? (
        searchResult ? (
          (searchResult as string) === "not-found" ? (
            <NotFoundResult />
          ) : (
            <PlayOnUsers
              users={searchResult as RoomUserData[]}
              route={route}
              setAddUsers={setAddUsers}
            />
          )
        ) : (
          <PlayOnUsers
            users={contactsData as RoomUserData[]}
            route={route}
            setAddUsers={setAddUsers}
          />
          // <TestContacts route={route} />
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  labelText: {
    color: "grey",
    fontWeight: "500",
  },
  nameText: {
    color: "white",
    fontSize: 15,
    marginLeft: 8,
    padding: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  notFoundText: {
    color: "white",
    padding: 8,
    fontWeight: "500",
  },
  notFoundSubText: {
    textAlign: "center",
    paddingLeft: 24,
    paddingRight: 24,
    color: "grey",
  },
});
