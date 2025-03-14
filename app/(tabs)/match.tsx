import { useLocalSearchParams } from "expo-router";
import MatchPage from "../../components/match-page";

export default function Match() {
  const params = useLocalSearchParams();

  return (
    <MatchPage
      sport={params.sport as string}
      author={params.author as string}
      venue={params.venue as string}
      skillLevel={params.skillLevel as string}
      dateTime={params.dateTime as string}
      participantsCount={Number(params.participantsCount)}
      description={params.description as string}
    />
  );
}
