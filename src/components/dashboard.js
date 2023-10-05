import React from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie, PolarArea, Doughnut, Bar } from 'react-chartjs-2';

function Dashboard(props) {
    const { userData, postData, top10Words } = props;

    const cityCounts = {};
    userData.forEach(user => {
        const city = user.address.city;
        if (!cityCounts[city]) {
            cityCounts[city] = 1;
        } else {
            cityCounts[city]++;
        }
    });

    const genderCounts = { "male": 0, "female": 0 };
    userData.forEach(user => {
        const gender = user.gender; // "address" nesnesine gerek yok
        gender === "Male" ? genderCounts.male++ : genderCounts.female++;
    });

    const yearCounts = {};
    postData.forEach(item => {
        const date = item.date;
        const dateParts = date.split('/');
        const year = dateParts[2];
        if (!yearCounts[year]) {
            yearCounts[year] = 1;
        } else {
            yearCounts[year]++;
        }
    });

    const ageGroups = {
        "20-": 0,
        "20-25": 0,
        "25-30": 0,
        "30+": 0,
    };
    userData.forEach(user => {
        const age = user.age;
        if (age < 20) {
            ageGroups["20-"]++;
        } else if (age >= 20 && age <= 25) {
            ageGroups["20-25"]++;
        } else if (age > 25 && age <= 30) {
            ageGroups["25-30"]++;
        } else {
            ageGroups["30+"]++;
        }
    });


    const lineData = {
        labels: top10Words.map(item => item.word),
        datasets: [{
            label: 'En çok Kullanılan Kelimeler',
            data: top10Words.map(item => item.count),
        }]
    };

    const pieData = {
        labels: Object.keys(genderCounts),
        datasets: [{
            label: 'Cinsiyet Dağılımı',
            data: Object.values(genderCounts)
        }]
    };

    const polarData = {
        labels: Object.keys(ageGroups),
        datasets: [{
            label: 'Yaş Dağılımı',
            data: Object.values(ageGroups),
        }]
    };

    const doughnutData = {
        labels: Object.keys(cityCounts),
        datasets: [{
            label: 'Şehir-Üye Dağılımı',
            data: Object.values(cityCounts),
        }]
    };

    const barData = {
        labels: Object.keys(yearCounts),
        datasets: [{
            label: 'Yıl Dağılımı',
            data: Object.values(yearCounts),
        }]
    };

    return (
        <div>
            <section style={{ width: '600px' }}>
                <Line data={lineData} />
            </section>
            <section style={{ width: '600px' }}>
                <Pie data={pieData} />
            </section>
            <section style={{ width: '600px' }}>
                <PolarArea data={polarData} />
            </section>
            <section style={{ width: '600px' }}>
                <Doughnut data={doughnutData} />
            </section>
            <section style={{ width: '600px' }}>
                <Bar data={barData} />
            </section>

        </div>
    )
}

export default Dashboard;
