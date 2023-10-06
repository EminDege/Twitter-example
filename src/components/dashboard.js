import React from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie, PolarArea, Doughnut, Bar } from 'react-chartjs-2';

function Dashboard(props) {
    const { userData, postData, top10Words } = props;

    if (!userData || !postData || !top10Words) {
        return <div className='text-center'>Loading...</div>;
    }

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
        const gender = user.gender;
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

    const barData = {
        labels: Object.keys(yearCounts),
        datasets: [{
            label: 'Tweet Sayısı',
            data: Object.values(yearCounts),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 0, 0, 0.2)',
                'rgba(0, 255, 0, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(255, 0, 0)',
                'rgb(0, 255, 0)',
            ],
            borderWidth: 1
        }]
    };

    const lineData = {
        labels: top10Words.map(item => item.word),
        datasets: [{
            label: 'Kelime Sayısı',
            data: top10Words.map(item => item.count),
            fill: false,
            tension: 0.3
        }]
    };

    const pieData = {
        labels: Object.keys(genderCounts),
        datasets: [{
            label: 'Cinsiyet Dağılımı',
            data: Object.values(genderCounts),
            hoverOffset: 4
        }]
    };

    const polarData = {
        labels: Object.keys(ageGroups),
        datasets: [{
            label: 'Yaş Dağılımı',
            data: Object.values(ageGroups),
            hoverOffset: 4
        }]
    };

    const doughnutData = {
        labels: Object.keys(cityCounts),
        datasets: [{
            label: 'Şehir-Üye Dağılımı',
            data: Object.values(cityCounts),
            hoverOffset: 4
        }]
    };

    return (
        <div className='dashboard'>
            <section className='bigGraph' >
                <h3>Tweetlerin Yıl Dağılımı</h3>
                <Bar data={barData} />
            </section>
            <section className='bigGraph'>
                <h3>En Çok Kullanılan Kelimeler</h3>
                <Line data={lineData} />
            </section>
            <section>
                <h3>Cinsiyet Dağılımı</h3>
                <Pie data={pieData} />
            </section>
            <section>
                <h3>Yaş Dağılımı</h3>
                <PolarArea data={polarData} />
            </section>
            <section>
                <h3>Şehir Dağılımı</h3>
                <Doughnut data={doughnutData} />
            </section>
            <section className='dashButtons'>
                <div>
                    <button className='mb-3'>Tüm Tweetleri Gör</button> <br />
                    <button>Profillere git</button>
                </div>
            </section >

        </div >
    )
}

export default Dashboard;
