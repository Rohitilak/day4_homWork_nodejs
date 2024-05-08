import axios from "axios";
import { load } from "cheerio";

import xlsx from "xlsx";


const url = "https://www.shine.com/job-search/fresher-jobs";

(async ()=>{
    const reponse = await axios.get(url);
    // console.log(reponse.data);

    const html = reponse.data;

    const j$ = load(html);
    const data = [];
    data.push(['Job Title', 'Company Name', 'Location', 'Posted Date', 'Job Description'])

    const details = j$(".jobCard_jobCard__jjUmu")
    // console.log(details.length);
    details.each((_,ele)=>{
        const container = j$(ele);

        const jobTitle = container.find('h2').text();
        const compnayName = container.find('.jobCard_jobCard_cName__mYnow').text();
        const location = container.find('.jobCard_locationIcon__zrWt2').text()
        const postedDate = container.find('.jobCard_jobCard_features__wJid6 > span').text();
        const jobDescription = container.find('.jobCard_jobIcon__3FB1t').text();
        console.log("jobTitle", jobTitle, "companyName", compnayName, 'location', location, "postedDate", postedDate, "jobDescription", jobDescription);
        data.push([jobTitle, compnayName, location, postedDate, jobDescription]);
    })

    const workbook = xlsx.utils.book_new();

    const sheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, sheet, 'Scraped data');
    xlsx.writeFile(workbook,'jobDetails.xlsx',)
    console.log("done!");
})()