
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
  }
});

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`

// We can pass the JSON response as an object to our createTodoistTask later.
const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init)
    return response.json()
}
browser.commands.onCommand.addListener((command) => {
  fetchDailyCodingChallenge().then(e => {
    browser.tabs.create({url: "https://leetcode.com" + e.data.activeDailyCodingChallengeQuestion.link});
  }).catch(e =>{
    
  })
});
