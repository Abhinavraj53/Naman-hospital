import axiosClient from "./axiosClient";

const mockPosts = [
  {
    id: "post-1",
    title: "नमन हॉस्पिटल मेगा हेल्थ कैंप – 15 मार्च को पधारें",
    slug: "naman-hospital-health-camp-march",
    category: "Hospital News",
    excerpt:
      "मुफ़्त ब्लड शुगर, बीपी, ईसीजी और महिलाओं की स्वास्थ्य जांच के लिए सुबह 9 बजे से नामांकन शुरू।",
    coverImage: "/mediplus-images/image_4.jpg",
    author: "Naman Hospital Team",
    publishedAt: Date.now(),
    content:
      "<p>नमन हॉस्पिटल 15 मार्च 2026 को मेगा हेल्थ कैंप आयोजित कर रहा है। इसमें मुफ्त बीपी, शुगर, ईसीजी जांच, महिलाओं का कैंसर स्क्रीनिंग, टीकाकरण और डॉक्टर परामर्श उपलब्ध रहेगा। डॉ. एन.के. सुमन तथा विशेषज्ञ टीम सुबह 9 बजे से मरीजों को परामर्श प्रदान करेगी।</p><p>रजिस्ट्रेशन के लिए हेल्पडेस्क पर संपर्क करें या care@namanhospital.com पर ईमेल भेजें। सीमित स्लॉट हैं, कृपया समय पर पहुँचें।</p>"
  },
  {
    id: "post-2",
    title: "मॉनसून सीज़न में छाती एवं सांस संबंधी रोगों से बचाव",
    slug: "monsoon-chest-care-tips",
    category: "Health Tips",
    excerpt:
      "डॉ. नीलम मिश्रा बताती हैं कि बरसात में दमा, टीबी और संक्रमण से कैसे बचें और समय पर इलाज क्यों ज़रूरी है।",
    coverImage: "/mediplus-images/image_2.jpg",
    author: "Dr. Neelam Mishra",
    publishedAt: Date.now(),
    content:
      "<p>बरसात में उमस और नमी बढ़ने से सांस से संबंधित रोग तेज़ हो जाते हैं। डॉ. नीलम मिश्रा सलाह देती हैं कि दमे के मरीज इनहेलर समय पर लें, धूल-धुएँ से बचें और नियमित चेकअप करवाएँ।</p><p>ट्यूबरक्यूलोसिस के मरीज उपचार बीच में न छोड़ें एवं डॉक्टर से संपर्क में रहें। अस्पताल की नेबुलाइजेशन और पल्मोनरी फ़ंक्शन टेस्ट सुविधा 24×7 उपलब्ध है।</p>"
  },
  {
    id: "post-3",
    title: "सुरक्षित प्रसव के लिए 7 महत्वपूर्ण बातें",
    slug: "safe-maternity-care-tips",
    category: "Women & Child Care",
    excerpt:
      "नमन हॉस्पिटल की प्रसूति एवं स्त्री रोग विशेषज्ञ डॉ. रश्मि झा गर्भावस्था से प्रसव तक की आवश्यक तैयारी साझा करती हैं।",
    coverImage: "/mediplus-images/person_2.jpg",
    author: "Dr. Rashmi Jha",
    publishedAt: Date.now(),
    content:
      "<p>स्वस्थ गर्भावस्था के लिए संतुलित आहार, नियमित टीकाकरण, समय पर सोनोग्राफी और बीपी-शुगर जांच बेहद जरूरी हैं। डॉ. रश्मि झा बताती हैं कि हाई-रिस्क प्रेग्नेंसी के लिए हॉस्पिटल में विशेष मॉनिटरिंग बेड और विशेषज्ञ टीम उपलब्ध है।</p><p>प्रसव के बाद माँ और शिशु की देखभाल के लिए लैक्टेशन क्लिनिक और 24×7 नवजात आईसीयू सेवा नामन हॉस्पिटल में संचालित है।</p>"
  }
];

const blogApi = {
  async getAll() {
    try {
      return await axiosClient.get("/blog");
    } catch (error) {
      return { posts: mockPosts };
    }
  },
  async getBySlug(slug) {
    try {
      return await axiosClient.get(`/blog/${slug}`);
    } catch (error) {
      const post = mockPosts.find(item => item.slug === slug);
      if (post) {
        return { post };
      }
      throw error;
    }
  }
};

export default blogApi;

