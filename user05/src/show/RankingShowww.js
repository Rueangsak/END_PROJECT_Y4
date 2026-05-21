import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChartPanel } from '../layout';

export default function RankingShowww(props) {
  const { docId } = useParams();
  const filtered = props.answerUser.filter((data) => data.index === props.indexFilterShow);

  const [userData] = useState({
    labels: filtered.map((data) => data.answer),
    datasets: [
      {
        label: 'Ranking',
        data: filtered.map((data) => data.count),
        backgroundColor: ['#0B57D0', '#4F46E5', '#15803D', '#B45309', '#64748B'],
        borderWidth: 0,
      },
    ],
  });

  return (
    <ChartPanel
      title="Live ranking"
      subtitle={props.data?.question}
      empty={filtered.length === 0 ? 'No votes yet' : undefined}
    >
      <Bar data={userData} options={{ responsive: true, maintainAspectRatio: false }} />
    </ChartPanel>
  );
}
