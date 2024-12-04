import GraphDisplay from '../components/GraphDisplay';

export default function GraphsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rover Motion Graphs</h1>
      <GraphDisplay />
    </div>
  );
}
