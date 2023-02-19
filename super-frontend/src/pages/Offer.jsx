import { useParams } from "react-router-dom";

export default function Offer() {
  let { id } = useParams();
  return <div>Offer ID: {id}</div>;
}
