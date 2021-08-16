import Card from "../../Components/Card";

const cards = [
  {
    name: "journal entries",
    type: "Accounting",
    description: "Enter journal entries",
  },
];

const Home = () => {
  const display = cards.map((cardDetail) => <Card {...cardDetail} />);

  return <div>{display}</div>;
};

export default Home;
