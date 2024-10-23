

const reportData = [];

const statuses = ["removed", "suspended", "deleted", "activated"];
const titles = ["Aftermath Therapist", "Pregnancy Survival"];
const sampleDetail = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>.`;
const sampleDate = "2022-12-12T12:00:00"

for (let i = 1; i <= 35; i++) {
    const report = {
        id: i,
        title: titles[Math.floor(Math.random() * titles.length)],
        detail: sampleDetail,
        date: sampleDate,
        report_status: statuses[Math.floor(Math.random() * statuses.length)]
    };

    reportData.push(report);
}

export {reportData}