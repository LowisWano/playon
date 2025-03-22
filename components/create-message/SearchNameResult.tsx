import { Text, ScrollView, StyleSheet } from "react-native";
import { NotFoundResult, PlayOnUsers, TestContacts } from "./sub-components/Result";
import { BasicUserData } from "../../types/entities/User";

type SearchNameResultProps = {
  route: string;
  searchName: string | null;
  searchResult: BasicUserData[] | string | null;
  contactsData: BasicUserData[] | null;
  setAddUsers?: React.Dispatch<React.SetStateAction<BasicUserData[]>>;
};

export default function SearchNameResult(props: SearchNameResultProps) {
  const { route, searchName, searchResult, contactsData, setAddUsers } = props;

  console.log(contactsData);

  return (
    <ScrollView style={{ marginTop: 16 }}>
      <Text style={style.labelText}>
        {searchName && "Search Result"}
        {!searchName && route === "create-message" ? "Recent Contacts" : "In Contacts"}
      </Text>

      {searchResult ? (
        (searchResult as string) === "not-found" ? (
          <NotFoundResult />
        ) : (
          <PlayOnUsers
            users={searchResult as BasicUserData[]}
            route={route}
            setAddUsers={setAddUsers}
          />
        )
      ) : (
        // <PlayOnUsers
        //   users={contactsData as BasicUserData[]}
        //   route={route}
        //   setAddUsers={setAddUsers}
        // />
        <TestContacts route={route} />
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
