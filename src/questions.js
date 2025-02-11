const questions = [
  // Fun & Lighthearted
  {
    id: 1,
    category: "Fun & Lighthearted",
    text: "If you could have any superpower, what would it be?"
  },
  {
    id: 2,
    category: "Fun & Lighthearted",
    text: "What's your go-to karaoke song?"
  },
  {
    id: 3,
    category: "Fun & Lighthearted",
    text: "If you were an animal, what would you be and why?"
  },
  {
    id: 4,
    category: "Fun & Lighthearted",
    text: "What's your guilty pleasure TV show or movie?"
  },
  {
    id: 5,
    category: "Fun & Lighthearted",
    text: "What's the weirdest food combination you love?"
  },
  {
    id: 6,
    category: "Fun & Lighthearted",
    text: "If you could switch lives with a celebrity for a day, who would it be?"
  },
  {
    id: 7,
    category: "Fun & Lighthearted",
    text: "What's the most spontaneous thing you've ever done?"
  },
  {
    id: 8,
    category: "Fun & Lighthearted",
    text: "If you had to eat one meal for the rest of your life, what would it be?"
  },
  {
    id: 9,
    category: "Fun & Lighthearted",
    text: "Do you believe in aliens? Why or why not?"
  },
  {
    id: 10,
    category: "Fun & Lighthearted",
    text: "If you could time travel, would you go to the past or future?"
  },

  // Work & Productivity
  {
    id: 11,
    category: "Work & Productivity",
    text: "What's the best piece of career advice you've ever received?"
  },
  {
    id: 12,
    category: "Work & Productivity",
    text: "Do you prefer working from home or in the office?"
  },
  {
    id: 13,
    category: "Work & Productivity",
    text: "What's one productivity hack you swear by?"
  },
  {
    id: 14,
    category: "Work & Productivity",
    text: "If you could have any job in the world, what would it be?"
  },
  {
    id: 15,
    category: "Work & Productivity",
    text: "How do you stay motivated on tough days?"
  },
  {
    id: 16,
    category: "Work & Productivity",
    text: "What's the most interesting job you've ever had?"
  },
  {
    id: 17,
    category: "Work & Productivity",
    text: "If you could take a year off to learn something new, what would it be?"
  },
  {
    id: 18,
    category: "Work & Productivity",
    text: "Are you a morning person or a night owl?"
  },
  {
    id: 19,
    category: "Work & Productivity",
    text: "What's your favorite way to unwind after work?"
  },
  {
    id: 20,
    category: "Work & Productivity",
    text: "How do you handle stressful situations?"
  },

  // Personal Interests & Hobbies
  {
    id: 21,
    category: "Personal Interests & Hobbies",
    text: "What's your favorite way to spend a lazy Sunday?"
  },
  {
    id: 22,
    category: "Personal Interests & Hobbies",
    text: "Do you prefer books, movies, or TV shows?"
  },
  {
    id: 23,
    category: "Personal Interests & Hobbies",
    text: "What's one hobby you've always wanted to try but haven't yet?"
  },
  {
    id: 24,
    category: "Personal Interests & Hobbies",
    text: "If you could instantly master any skill, what would it be?"
  },
  {
    id: 25,
    category: "Personal Interests & Hobbies",
    text: "What's the last book you read?"
  },
  {
    id: 26,
    category: "Personal Interests & Hobbies",
    text: "Are you more of a beach person or a mountain person?"
  },
  {
    id: 27,
    category: "Personal Interests & Hobbies",
    text: "What's your favorite kind of music to listen to?"
  },
  {
    id: 28,
    category: "Personal Interests & Hobbies",
    text: "Do you like cooking? What's your signature dish?"
  },
  {
    id: 29,
    category: "Personal Interests & Hobbies",
    text: "What's the best concert or live event you've ever been to?"
  },
  {
    id: 30,
    category: "Personal Interests & Hobbies",
    text: "Do you prefer big gatherings or small get-togethers?"
  },

  // Travel & Adventure
  {
    id: 31,
    category: "Travel & Adventure",
    text: "What's the most memorable trip you've ever taken?"
  },
  {
    id: 32,
    category: "Travel & Adventure",
    text: "If you could visit any country in the world, where would you go?"
  },
  {
    id: 33,
    category: "Travel & Adventure",
    text: "Do you prefer city trips or nature escapes?"
  },
  {
    id: 34,
    category: "Travel & Adventure",
    text: "Have you ever had a travel mishap? What happened?"
  },
  {
    id: 35,
    category: "Travel & Adventure",
    text: "What's the best food you've tried while traveling?"
  },
  {
    id: 36,
    category: "Travel & Adventure",
    text: "Would you rather take a road trip or fly to a destination?"
  },
  {
    id: 37,
    category: "Travel & Adventure",
    text: "What's the one place you recommend everyone visit at least once?"
  },
  {
    id: 38,
    category: "Travel & Adventure",
    text: "Do you like to plan trips in advance or be spontaneous?"
  },
  {
    id: 39,
    category: "Travel & Adventure",
    text: "What's the most unique place you've ever stayed overnight?"
  },
  {
    id: 40,
    category: "Travel & Adventure",
    text: "Have you ever traveled solo? If not, would you?"
  },

  // Food & Drinks
  {
    id: 41,
    category: "Food & Drinks",
    text: "Do you prefer coffee or tea?"
  },
  {
    id: 42,
    category: "Food & Drinks",
    text: "What's your favorite type of dessert?"
  },
  {
    id: 43,
    category: "Food & Drinks",
    text: "What's a food you hated as a kid but love now?"
  },
  {
    id: 44,
    category: "Food & Drinks",
    text: "Do you like trying new restaurants or sticking to your favorites?"
  },
  {
    id: 45,
    category: "Food & Drinks",
    text: "What's your go-to comfort food?"
  },
  {
    id: 46,
    category: "Food & Drinks",
    text: "What's one weird food you've tried that surprised you?"
  },
  {
    id: 47,
    category: "Food & Drinks",
    text: "If you could only eat one cuisine forever, what would it be?"
  },
  {
    id: 48,
    category: "Food & Drinks",
    text: "Are you more of a sweet or savory person?"
  },
  {
    id: 49,
    category: "Food & Drinks",
    text: "Have you ever tried making your own cocktails or coffee drinks?"
  },
  {
    id: 50,
    category: "Food & Drinks",
    text: "What's your ultimate dream meal?"
  },

  // Would You Rather?
  {
    id: 51,
    category: "Would You Rather?",
    text: "Would you rather have unlimited money or unlimited time?"
  },
  {
    id: 52,
    category: "Would You Rather?",
    text: "Would you rather never be stuck in traffic again or never wait in line again?"
  },
  {
    id: 53,
    category: "Would You Rather?",
    text: "Would you rather be famous for something silly or unknown for something important?"
  },
  {
    id: 54,
    category: "Would You Rather?",
    text: "Would you rather always be 10 minutes early or always 10 minutes late?"
  },
  {
    id: 55,
    category: "Would You Rather?",
    text: "Would you rather give up your phone for a month or TV for a year?"
  },
  {
    id: 56,
    category: "Would You Rather?",
    text: "Would you rather have the ability to read minds or teleport?"
  },
  {
    id: 57,
    category: "Would You Rather?",
    text: "Would you rather have a personal chef or a personal trainer?"
  },
  {
    id: 58,
    category: "Would You Rather?",
    text: "Would you rather live in a tiny home in a big city or a mansion in the countryside?"
  },
  {
    id: 59,
    category: "Would You Rather?",
    text: "Would you rather travel back in time or into the future?"
  },
  {
    id: 60,
    category: "Would You Rather?",
    text: "Would you rather always have perfect weather or always have weekends off?"
  },

  // Entertainment & Pop Culture
  {
    id: 61,
    category: "Entertainment & Pop Culture",
    text: "What's the best movie you've seen recently?"
  },
  {
    id: 62,
    category: "Entertainment & Pop Culture",
    text: "What TV show do you think everyone should watch?"
  },
  {
    id: 63,
    category: "Entertainment & Pop Culture",
    text: "Who's your favorite fictional character of all time?"
  },
  {
    id: 64,
    category: "Entertainment & Pop Culture",
    text: "Do you prefer classic movies or modern blockbusters?"
  },
  {
    id: 65,
    category: "Entertainment & Pop Culture",
    text: "What's one song you could listen to on repeat forever?"
  },
  {
    id: 66,
    category: "Entertainment & Pop Culture",
    text: "If you could be in any movie, which one would you choose?"
  },
  {
    id: 67,
    category: "Entertainment & Pop Culture",
    text: "What's the best book-to-movie adaptation you've seen?"
  },
  {
    id: 68,
    category: "Entertainment & Pop Culture",
    text: "Do you like watching reality TV? Why or why not?"
  },
  {
    id: 69,
    category: "Entertainment & Pop Culture",
    text: "If you could be a character in a video game, which one would it be?"
  },
  {
    id: 70,
    category: "Entertainment & Pop Culture",
    text: "What's the funniest meme or viral video you've seen recently?"
  },

  // Personal Growth & Reflection
  {
    id: 71,
    category: "Personal Growth & Reflection",
    text: "What's one thing you're currently working on improving about yourself?"
  },
  {
    id: 72,
    category: "Personal Growth & Reflection",
    text: "How do you usually handle challenges or setbacks?"
  },
  {
    id: 73,
    category: "Personal Growth & Reflection",
    text: "What's the best decision you've ever made?"
  },
  {
    id: 74,
    category: "Personal Growth & Reflection",
    text: "What's something that always brings you joy?"
  },
  {
    id: 75,
    category: "Personal Growth & Reflection",
    text: "If you had to give a TED Talk on any topic, what would it be?"
  },
  {
    id: 76,
    category: "Personal Growth & Reflection",
    text: "What's a habit you've developed that has changed your life?"
  },
  {
    id: 77,
    category: "Personal Growth & Reflection",
    text: "How do you define success for yourself?"
  },
  {
    id: 78,
    category: "Personal Growth & Reflection",
    text: "If you could give your future self advice, what would it be?"
  },
  {
    id: 79,
    category: "Personal Growth & Reflection",
    text: "What motivates you to keep going on difficult days?"
  },
  {
    id: 80,
    category: "Personal Growth & Reflection",
    text: "What's one thing you're grateful for today?"
  }
];

export default questions; 