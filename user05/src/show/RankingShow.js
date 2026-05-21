import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { ChartPanel } from '../layout';

ChartJS.register();

export default function RankingShow(props) {
  const { docId, index } = useParams();
  const [name, setName] = useState([]);
  const docRef = doc(db, 'Form', docId);

  useEffect(() => {
    getDocs(collection(docRef, 'answers'))
      .then((querySnapshot) => {
        const x = [];
        querySnapshot.forEach((d) => {
          if (String(d.data().index) === String(index)) {
            const y = x.findIndex((item) => item.answer === d.data().answer);
            if (y === -1) {
              x.push({ user: d.data().user, answer: d.data().answer, count: 1 });
            } else {
              x[y].count += 1;
            }
          }
        });
        setName(x);
      })
      .catch((error) => console.log('Error getting documents: ', error));
  }, [docId, index]);

  const chartData = {
    labels: name.map((data) => data.answer),
    datasets: [
      {
        label: 'Votes',
        data: name.map((data) => data.count),
        backgroundColor: ['#0B57D0', '#4F46E5', '#15803D', '#B45309', '#64748B'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <ChartPanel title="Live ranking" empty={name.length === 0 ? 'No votes yet' : undefined}>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </ChartPanel>
  );
}
