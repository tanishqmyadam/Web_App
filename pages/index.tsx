// import GraphDisplay from '../components/GraphDisplay';
// import FieldForm from '../../components/FieldForm';

// export default function FieldFormPage() {
//   return (
//     <div>
//       <FieldForm />
//     </div>
//   );
// }
// export default function Home() {
//   return (
//     <div>
//       <h1>Rover Motion Plan</h1>
//       <GraphDisplay />
//     </div>
//   );
// } 
import GraphDisplay from '../components/GraphDisplay';
import FieldForm from '../components/FieldForm';

export default function FieldFormPage() {
  // Define the number of FieldForm components you want to display
  const numberOfForms = 1; // Change this number as needed
  const fieldForms = Array.from({ length: numberOfForms }, (_, index) => (
    <FieldForm key={index} />
  ));

  const numberOfGraphs = 1; // Change this number as needed
  const graphDisplays = Array.from({ length: numberOfGraphs }, (_, index) => (
    <GraphDisplay key={index} />
  ));

  return (
    <div>
      {fieldForms}
      <h1>Data Visualization</h1>
      {graphDisplays}
    </div>
  );
}

// export function Home() {
//   // Define the number of GraphDisplay components you want to display
//   const numberOfGraphs = 1; // Change this number as needed
//   const graphDisplays = Array.from({ length: numberOfGraphs }, (_, index) => (
//     <GraphDisplay key={index} />
//   ));

//   return (
//     <div>
//       <h1>Rover Motion Plan</h1>
//       {graphDisplays}
//     </div>
//   );
// }