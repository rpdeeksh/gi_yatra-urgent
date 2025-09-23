import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Select, MenuItem, InputLabel, FormControl, Box, Grid, Container, AppBar, Toolbar } from '@mui/material';
import './App.css';

const App = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Udupi');
  const [selectedOption, setSelectedOption] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Background images for the hero section
  const heroImages = [
    '/images/GI_Gallery/mysore-silk.jpg',
    '/images/GI_Gallery/channapatna-toys.jpg',
    '/images/GI_Gallery/bidriware.jpg',
    '/images/GI_Gallery/ilkal-sarees.jpg',
    '/images/GI_Gallery/coorg-coffee.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    setItinerary([]); // Clear previous results
    
    // Check if the selected district has itinerary data
    if (selectedDistrict !== 'Udupi') {
      // For districts other than Udupi, show coming soon message
      setTimeout(() => {
        setItinerary([
          {
            sessionTitle: 'Coming Soon',
            time: 'Available Soon',
            place: `${selectedDistrict} District GI Tour`,
            isAd: true,
            description: `We are currently developing comprehensive GI tour itineraries for ${selectedDistrict} district. Our team is working to map out all the authentic GI products and cultural experiences available in this region.`,
            experience: `Stay tuned for exciting GI experiences in ${selectedDistrict}! We will soon feature local artisans, traditional crafts, and authentic products unique to this district.`,
            nearbyAttraction: 'Complete itinerary with local attractions, GI products, and cultural experiences will be available soon.',
            mapEmbed: '<div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px;"><p style="margin: 0; color: #666;">Interactive map will be available when the itinerary is launched</p></div>',
          }
        ]);
        setIsGenerating(false);
      }, 2000); // Shorter delay for coming soon message
      return;
    }
    
    // Simulate loading with 5 second delay for Udupi
    setTimeout(() => {
      let itineraryData = [];

      if (selectedOption === '1') {
        itineraryData = [
          {
            sessionTitle: 'Morning Session',
            time: '10:00 AM - 11:30 AM',
            place: 'Udupi Mallige (Shankarpura Mallige)',
            image: '/images/GI_Gallery/udupi-mallige.jpg',
            description: 'Udupi Mallige (Shankarpura Mallige) is a unique variety of jasmine that is renowned for its fragrance and cultural significance. The flowers are grown in the Udupi region and are part of Karnataka\'s GI (Geographical Indication) list. Udupi Mallige has a long tradition of being used in religious rituals and as a decorative flower.',
            experience: 'Visit local flower markets or nurseries like the Shankarpura Mallige Nursery, where you can see the flowers growing and learn about their cultivation methods. The local women also weave these flowers into garlands, which are sold in temples and markets.',
            nearbyAttraction: 'Visit Sri Krishna Temple, Udupi (15 minutes from Shankarpura) - One of the most famous temples in the region, dedicated to Lord Krishna. Udupi is known for its rich spiritual heritage and the famous Udupi Annapoorneshwari Prasadam served at the temple.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.5563144967114!2d74.78388997572607!3d13.253137608641987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaf00f4c522e1%3A0x65479185e378eeb1!2sShankarpura%20mallige%20Nursery!5e0!3m2!1sen!2sin!4v1758612042428!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Coffee Break',
            time: '11:45 AM - 12:30 PM',
            place: 'Coffee Break & Local Delicacies',
            isAd: true,
            description: 'Udupi is also known for its rich culinary tradition. Take a short break to sample some local specialties such as Udupi Sambar and Neer Dosa at a traditional local eatery.',
            experience: 'Visit Woodlands Restaurant for a traditional Udupi breakfast.',
            nearbyAttraction: 'Explore Sita Mallikarjuna Temple, a temple famous for its rich history and beautiful architecture.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.8!2d74.748!3d13.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sWoodlands%20Restaurant%20Udupi!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Midday Session',
            time: '12:30 PM - 2:00 PM',
            place: 'Mattu Gulla (Mattu Eggplant)',
            image: '/images/GI_Gallery/mattu-gulla.jpg',
            description: 'Mattu Gulla, a unique GI product from Udupi, is a variety of eggplant grown in the Mattu region, which is famous for its distinctive taste and soft texture. It\'s used in a variety of local dishes.',
            experience: 'Visit the Mattu Gulla Belegarara Sangha, a farmers\' cooperative that works on preserving this unique variety. You can meet farmers who cultivate this unique vegetable, and you might get the chance to see its harvest.',
            nearbyAttraction: 'Malpe Beach (10 mins from Mattu Gulla) - Relax and enjoy the scenic view of Malpe beach, one of Udupi\'s most serene coastal spots. Take a stroll or enjoy the beautiful beachside views.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.1744629408636!2d74.72870287572631!3d13.27703570810692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb007ee2f86f%3A0x5ad8ff9b0a038076!2sMattu%20Gulla%20Belegarara%20Sangha!5e0!3m2!1sen!2sin!4v1758611916508!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Afternoon Session',
            time: '2:00 PM - 3:30 PM',
            place: 'Udupi Saree (Udupi Saree Weaving Co-operative)',
            image: '/images/GI_Gallery/udupi-saree.jpg',
            description: 'Udupi sarees are a part of Karnataka\'s GI list and are famous for their traditional weaving techniques and vibrant colors. The unique style of weaving has been passed down for generations in the Udupi region.',
            experience: 'Visit the Udupi Saree Association to see how the sarees are handwoven by skilled artisans. You can also purchase a few handwoven sarees as souvenirs to support local artisans.',
            nearbyAttraction: 'Chandramouleshwara Temple (15 mins from Udupi Saree Association) - A beautiful ancient temple that is dedicated to Lord Shiva, known for its intricate architecture.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5587218156047!2d74.84403137572406!3d13.063736712850268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba353144c6ad0b9%3A0x5ebc41d59fff29db!2sTALIPADY%20PRIMARY%20WEAVERS%20SERVICES%20CO%20OPRATIVE%20SOCIETY%20LTD%20KINNIGOLI%20Mr%20MADHAVA%20SHETTIGAR!5e0!3m2!1sen!2sin!4v1758611877483!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Local Markets',
            time: '3:45 PM - 5:00 PM',
            place: 'Explore Udupi\'s Local Markets',
            isAd: true,
            description: 'Take a leisurely walk through the local markets of Udupi to experience the vibrant culture and shop for local handicrafts, spices, and souvenirs. You can find fresh spices, locally made snacks, and beautiful handwoven fabrics.',
            experience: 'Visit Kadiyali Market for an authentic experience of local flavors and spices.',
            nearbyAttraction: 'Explore various local shops and experience the bustling market culture of Udupi.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.8!2d74.748!3d13.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sKadiyali%20Market%20Udupi!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Evening Session',
            time: '5:30 PM - 7:00 PM',
            place: 'Visit Malpe Beach & Explore Seafood',
            isAd: true,
            description: 'Malpe Beach is one of Udupi\'s most popular coastal destinations. Known for its serene environment and beautiful shoreline, it\'s the perfect spot to unwind after a day of exploring. Spend some time walking along the beach, enjoying the cool sea breeze, and taking in the stunning views of the Arabian Sea.',
            experience: 'After exploring the beach, head to one of the nearby seafood shacks or restaurants to enjoy some fresh, locally sourced seafood. Malpe Beach is known for its seafood delicacies, including freshly fried fish, prawn curry, and crab dishes. Some popular places like Machali or Thimappa serve these delicious dishes in a traditional coastal style.',
            nearbyAttraction: 'Malpe Beach Sunset - If you\'re not in a rush, enjoy the breathtaking sunset over Malpe Beach. The view is absolutely stunning, especially in the evenings when the sun sets over the sea, providing a perfect end to your day.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sMalpe%20Beach!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Dinner and Conclusion',
            time: '7:30 PM - 9:00 PM',
            place: 'Dinner at a Local Restaurant',
            isAd: true,
            description: 'End your day by enjoying a traditional Udupi meal at Sannidhi Udupi Restaurant or Shree Krishna Bhavan. Udupi is known for its vegetarian cuisine, so expect delicious Udupi Thali served with local specialties like Gojju, Palya, Chutney, and Sweets.',
            experience: 'Experience authentic Udupi cuisine with traditional thali and local delicacies.',
            nearbyAttraction: 'After dinner, take a short walk to Udupi Sri Krishna Matha, another sacred and historical temple.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.8!2d74.748!3d13.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sShree%20Krishna%20Bhavan%20Udupi!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
        ];
      } else if (selectedOption === '2') {
        itineraryData = [
          // Day 1
          {
            dayTitle: 'Day 1: Exploring GI Products & Cultural Landmarks',
            sessionTitle: 'Morning Session',
            time: '10:00 AM - 11:30 AM',
            place: 'Udupi Mallige (Shankarpura Mallige)',
            image: '/images/GI_Gallery/udupi-mallige.jpg',
            description: 'Start your day by exploring Udupi Mallige (Shankarpura Mallige), a unique GI product famous for its fragrance and significance in religious and cultural rituals.',
            experience: 'Visit the Shankarpura Mallige Nursery to learn about the cultivation methods and the significance of this fragrant flower. You can also buy local flower garlands or other products made from the flowers.',
            nearbyAttraction: 'Sri Krishna Temple, Udupi (15-minute drive) - Udupi\'s famous Sri Krishna Temple is a must-visit. The temple offers a spiritual atmosphere and is also home to the famous Udupi Annapoorneshwari Prasadam.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.5563144967114!2d74.78388997572607!3d13.253137608641987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcaf00f4c522e1%3A0x65479185e378eeb1!2sShankarpura%20mallige%20Nursery!5e0!3m2!1sen!2sin!4v1758612042428!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Midday Session',
            time: '12:00 PM - 2:00 PM',
            place: 'Mattu Gulla (Mattu Eggplant)',
            image: '/images/GI_Gallery/mattu-gulla.jpg',
            description: 'Mattu Gulla, a GI-certified eggplant grown exclusively in Udupi\'s Mattu region, is renowned for its rich flavor and unique texture.',
            experience: 'Visit the Mattu Gulla Belegarara Sangha, a local cooperative, where farmers cultivate and preserve this special variety. You\'ll learn about its farming techniques and its significance in local cuisine.',
            nearbyAttraction: 'Malpe Beach (10 minutes from Mattu Gulla) - Take some time to unwind at Malpe Beach, known for its serene environment and beautiful coastline. Relax and enjoy the beach\'s atmosphere before continuing your journey.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.1744629408636!2d74.72870287572631!3d13.27703570810692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb007ee2f86f%3A0x5ad8ff9b0a038076!2sMattu%20Gulla%20Belegarara%20Sangha!5e0!3m2!1sen!2sin!4v1758611916508!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Lunch & Local Delicacies',
            time: '2:00 PM - 3:00 PM',
            place: 'Woodlands Restaurant',
            isAd: true,
            description: 'For lunch, head to Woodlands Restaurant, one of Udupi\'s iconic spots for authentic vegetarian meals. Try traditional Udupi dishes like Neer Dosa, Sambar, and Rava Kesari.',
            experience: 'Experience authentic Udupi cuisine at this iconic restaurant.',
            nearbyAttraction: 'Located in the heart of Udupi, perfect for exploring the city center.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.8!2d74.748!3d13.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sWoodlands%20Restaurant%20Udupi!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Afternoon Session',
            time: '3:15 PM - 5:00 PM',
            place: 'Explore Udupi Sri Krishna Matha & Surrounding Temples',
            isAd: true,
            description: 'After lunch, immerse yourself in the cultural heritage of Udupi by visiting the Sri Krishna Matha. This historic temple is a center of spiritual significance, and walking through its serene temple complex will give you a deeper understanding of Udupi\'s religious importance.',
            experience: 'Don\'t forget to visit the Madhva Sarovar, a sacred pond in the temple complex, and enjoy the calm atmosphere.',
            nearbyAttraction: 'Various ancient temples and cultural sites in the temple complex.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.8!2d74.748!3d13.341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sSri%20Krishna%20Matha%20Udupi!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Evening Session',
            time: '5:30 PM - 7:00 PM',
            place: 'Seafood Delicacies at Machali or Thimappa',
            isAd: true,
            description: 'End your exploration of Day 1 by indulging in Udupi\'s famous seafood delicacies. Head to Machali or Thimappa, both renowned for serving freshly caught fish and prawns.',
            experience: 'Try dishes like Fish Curry, Prawn Fry, or Mangalore Fish Curry, which are quintessential to coastal Karnataka\'s cuisine.',
            nearbyAttraction: 'Located near the coastal area with beautiful sea views.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sMachali%20Restaurant!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Sunset Session',
            time: '7:00 PM - 8:00 PM',
            place: 'Malpe Beach & Sunset',
            isAd: true,
            description: 'If you\'re not in a hurry, spend some more time at Malpe Beach to watch the stunning sunset over the Arabian Sea. It\'s a peaceful and serene way to wind down after a day of exploration.',
            experience: 'Enjoy the breathtaking sunset views and peaceful beach atmosphere.',
            nearbyAttraction: 'Perfect spot for photography and relaxation by the sea.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sMalpe%20Beach!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          // Day 2
          {
            dayTitle: 'Day 2: Discovering More GI Products & Scenic Attractions',
            sessionTitle: 'Morning Session',
            time: '9:00 AM - 10:30 AM',
            place: 'Udupi Saree (Udupi Saree Weaving Co-operative)',
            image: '/images/GI_Gallery/udupi-saree.jpg',
            description: 'The Udupi Saree, known for its intricate weaving techniques and vibrant designs, is a prized GI product.',
            experience: 'Visit the Udupi Saree Association to see artisans weaving these beautiful sarees. You can purchase a saree as a unique souvenir from your Udupi trip. Learn about the traditional weaving process that has been passed down through generations.',
            nearbyAttraction: 'Traditional weaving centers and local handicraft shops in the area.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5587218156047!2d74.84403137572406!3d13.063736712850268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba353144c6ad0b9%3A0x5ebc41d59fff29db!2sTALIPADY%20PRIMARY%20WEAVERS%20SERVICES%20CO%20OPRATIVE%20SOCIETY%20LTD%20KINNIGOLI%20Mr%20MADHAVA%20SHETTIGAR!5e0!3m2!1sen!2sin!4v1758611877483!5m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Midday Session',
            time: '10:45 AM - 12:00 PM',
            place: 'Visit Kaup Lighthouse',
            isAd: true,
            description: 'Head to Kaup Lighthouse for a panoramic view of the coastline. The lighthouse, built in 1901, offers a historical glimpse and fantastic views of the sea and surrounding landscapes.',
            experience: 'Climb to the top of the lighthouse to get a 360-degree view of the area. It\'s also a great spot for photography.',
            nearbyAttraction: 'Kaup Beach and the historic lighthouse structure with scenic coastal views.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.1!2d74.74!3d13.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sKaup%20Lighthouse!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Lunch & Relaxation',
            time: '12:30 PM - 2:00 PM',
            place: 'Seafood Delicacies at Machali or Thimappa (Again)',
            isAd: true,
            description: 'Enjoy another round of fresh seafood at Machali or Thimappa. These restaurants are known for their exceptional seafood preparations, including Fish Fry, Prawns, and Crab Curry.',
            experience: 'Experience the best of coastal Karnataka\'s seafood cuisine.',
            nearbyAttraction: 'Beachside dining with views of the Arabian Sea.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sThimappa%20Restaurant!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Afternoon Session',
            time: '2:15 PM - 3:30 PM',
            place: 'Explore Hoode Beach',
            isAd: true,
            description: 'Head to Hoode Beach, a more tranquil and peaceful spot compared to Malpe. It\'s ideal for relaxation and enjoying the coastal beauty.',
            experience: 'Take a relaxing stroll along the beach, enjoy the unspoiled natural surroundings, or simply sit back and soak in the serenity.',
            nearbyAttraction: 'Pristine beach with minimal crowds, perfect for peaceful moments.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.1!2d74.71!3d13.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcae31b0c1!2sHoode%20Beach!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Evening Session',
            time: '4:00 PM - 5:30 PM',
            place: 'Relax & Explore Malpe Beach (Again)',
            isAd: true,
            description: 'Return to Malpe Beach in the late afternoon to unwind before your journey ends.',
            experience: 'Enjoy a leisurely walk or simply relax by the shore, perhaps enjoying a drink or a snack from a beachside vendor.',
            nearbyAttraction: 'Beach activities, water sports, and beachside cafes.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sMalpe%20Beach!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
          {
            sessionTitle: 'Farewell Dinner',
            time: '6:00 PM - 7:30 PM',
            place: 'Farewell Dinner at a Beachside Restaurant',
            isAd: true,
            description: 'End your Udupi trip with a delicious beachside dinner. Choose a local restaurant by the beach where you can enjoy traditional Udupi Thali, Mangalore Buns, and a variety of coastal delicacies.',
            experience: 'Try Neer Dosa, Prawn Curry, and Coastal Biryani at a beachside restaurant near Malpe.',
            nearbyAttraction: 'Beachside dining with panoramic sea views and sunset ambiance.',
            mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.2!2d74.705!3d13.349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbbf0f3a1!2sMalpe%20Beach%20Restaurants!5e0!3m2!1sen!2sin" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
          },
        ];
      }

      setItinerary(itineraryData);
      setIsGenerating(false);
    }, 5000); // 5 second delay
  };

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img 
              src="/icons/logo.png" 
              alt="GI Yatra Logo" 
              className="navbar-logo"
            />
            <Typography variant="h6" className="navbar-title">
              GI Yatra
            </Typography>
          </Box>
          <Box className="navbar-links">
            <Button color="inherit" className="nav-link">Home</Button>
            <Button color="inherit" className="nav-link">Explore</Button>
            <Button color="inherit" className="nav-link">Artisans</Button>
            <Button color="inherit" className="nav-link">About</Button>
            <Button color="inherit" className="nav-link">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImages[currentImageIndex]})`
      }}>
        <Container maxWidth="lg" className="hero-content">
          <div className="hero-text">
            <Typography variant="h1" className="hero-title">
              GI Yatra
            </Typography>
            <Typography variant="h3" className="hero-subtitle">
              Discover India through its GI Treasures
            </Typography>
            <Typography variant="h6" className="hero-description">
              Embark on a cultural journey through India's Geographical Indication treasures. 
              Experience authentic crafts, taste traditional flavors, and connect with the 
              artisans who keep our heritage alive.
            </Typography>
            
            {/* Stats Section */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">⭐</div>
                <div className="stat-number">26+</div>
                <div className="stat-label">GI Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <div className="stat-number">2L+</div>
                <div className="stat-label">Artisans</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🌍</div>
                <div className="stat-number">15</div>
                <div className="stat-label">Districts</div>
              </div>
            </div>

            <div className="hero-buttons">
              <Button 
                variant="contained" 
                size="large" 
                className="cta-button primary"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                className="cta-button secondary"
              >
                Explore Products
              </Button>
            </div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Featured GI Products Preview */}
      <section className="featured-products">
        <Container maxWidth="lg">
          <Typography variant="h4" className="section-title">
            Featured GI Treasures
          </Typography>
          <div className="product-gallery">
            <div className="product-card">
              <img src="/images/GI_Gallery/mysore-silk.jpg" alt="Mysore Silk" />
              <div className="product-overlay">
                <Typography variant="h6">Mysore Silk</Typography>
                <Typography variant="body2">Traditional Karnataka Silk</Typography>
              </div>
            </div>
            <div className="product-card">
              <img src="/images/GI_Gallery/channapatna-toys.jpg" alt="Channapatna Toys" />
              <div className="product-overlay">
                <Typography variant="h6">Channapatna Toys</Typography>
                <Typography variant="body2">Wooden Lacquer Toys</Typography>
              </div>
            </div>
            <div className="product-card">
              <img src="/images/GI_Gallery/coorg-coffee.jpg" alt="Coorg Coffee" />
              <div className="product-overlay">
                <Typography variant="h6">Coorg Coffee</Typography>
                <Typography variant="body2">Premium Arabica Coffee</Typography>
              </div>
            </div>
            <div className="product-card">
              <img src="/images/GI_Gallery/bidriware.jpg" alt="Bidriware" />
              <div className="product-overlay">
                <Typography variant="h6">Bidriware</Typography>
                <Typography variant="body2">Metal Handicraft Art</Typography>
              </div>
            </div>
            <div className="product-card">
              <img src="/images/GI_Gallery/ilkal-sarees.jpg" alt="Ilkal Sarees" />
              <div className="product-overlay">
                <Typography variant="h6">Ilkal Sarees</Typography>
                <Typography variant="body2">Traditional Handwoven Sarees</Typography>
              </div>
            </div>
            <div className="product-card">
              <img src="/images/GI_Gallery/dharwad-pedha.jpg" alt="Dharwad Pedha" />
              <div className="product-overlay">
                <Typography variant="h6">Dharwad Pedha</Typography>
                <Typography variant="body2">Traditional Sweet Delicacy</Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Existing Planner Section */}
      <div className="planner-section">
        <Container maxWidth="lg">
          <Typography variant="h4" className="section-title">
            Plan Your GI Journey
          </Typography>
          
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel>District</InputLabel>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                label="District"
              >
                <MenuItem value="Bagalkot">Bagalkot</MenuItem>
                <MenuItem value="Ballari">Ballari (Bellary)</MenuItem>
                <MenuItem value="Belagavi">Belagavi (Belgaum)</MenuItem>
                <MenuItem value="Bengaluru Rural">Bengaluru Rural</MenuItem>
                <MenuItem value="Bengaluru Urban">Bengaluru Urban</MenuItem>
                <MenuItem value="Bidar">Bidar</MenuItem>
                <MenuItem value="Chamarajanagar">Chamarajanagar</MenuItem>
                <MenuItem value="Chikballapur">Chikballapur</MenuItem>
                <MenuItem value="Chikkamagaluru">Chikkamagaluru</MenuItem>
                <MenuItem value="Chitradurga">Chitradurga</MenuItem>
                <MenuItem value="Dakshina Kannada">Dakshina Kannada</MenuItem>
                <MenuItem value="Davanagere">Davanagere</MenuItem>
                <MenuItem value="Dharwad">Dharwad</MenuItem>
                <MenuItem value="Gadag">Gadag</MenuItem>
                <MenuItem value="Hassan">Hassan</MenuItem>
                <MenuItem value="Haveri">Haveri</MenuItem>
                <MenuItem value="Kalaburagi">Kalaburagi (Gulbarga)</MenuItem>
                <MenuItem value="Kodagu">Kodagu (Coorg)</MenuItem>
                <MenuItem value="Kolar">Kolar</MenuItem>
                <MenuItem value="Koppal">Koppal</MenuItem>
                <MenuItem value="Mandya">Mandya</MenuItem>
                <MenuItem value="Mysuru">Mysuru (Mysore)</MenuItem>
                <MenuItem value="Raichur">Raichur</MenuItem>
                <MenuItem value="Ramanagara">Ramanagara</MenuItem>
                <MenuItem value="Shivamogga">Shivamogga (Shimoga)</MenuItem>
                <MenuItem value="Tumakuru">Tumakuru (Tumkur)</MenuItem>
                <MenuItem value="Udupi">Udupi</MenuItem>
                <MenuItem value="Uttara Kannada">Uttara Kannada (Karwar)</MenuItem>
                <MenuItem value="Vijayapura">Vijayapura (Bijapur)</MenuItem>
                <MenuItem value="Yadgir">Yadgir</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel>Days</InputLabel>
              <Select value={selectedOption} onChange={handleOptionChange} label="Days">
                <MenuItem value="1">1 Day</MenuItem>
                <MenuItem value="2">2 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained" color="primary" onClick={generateItinerary} disabled={!selectedOption || isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Itinerary'}
          </Button>

          {/* Loading State */}
          {isGenerating && (
            <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4}>
              <div className="loader">
                <div className="spinner"></div>
              </div>
              <Typography variant="h6" className="loading-text" mt={2}>
                Generating Itinerary...
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                Please wait while we create your personalized GI journey
              </Typography>
            </Box>
          )}

          {/* Itinerary Results */}
          {!isGenerating && itinerary.length > 0 && (
            <>
              <Grid container spacing={3} mt={4}>
                {selectedOption === '1' && (
                  <Grid item xs={12}>
                    <Typography variant="h5" className="itinerary-title" gutterBottom>
                      GI Yatra - {selectedDistrict}: 1 Day Itinerary
                    </Typography>
                  </Grid>
                )}
                {selectedOption === '2' && (
                  <Grid item xs={12}>
                    <Typography variant="h5" className="itinerary-title" gutterBottom>
                      GI Yatra - {selectedDistrict}: 2-Day Itinerary
                    </Typography>
                  </Grid>
                )}
                {itinerary.map((item, index) => (
                  <React.Fragment key={index}>
                    {/* Day Title Card - Full Width */}
                    {item.dayTitle && (
                      <Grid item xs={12}>
                        <Typography variant="h4" className="day-title" gutterBottom>
                          {item.dayTitle}
                        </Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Card className={`card itinerary-card ${item.isAd ? 'ad-card' : 'gi-card'}`}>
                        {/* GI Product Image */}
                        {item.image && (
                          <div className="card-image-container">
                            <img 
                              src={item.image} 
                              alt={item.place}
                              className="card-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            {!item.isAd && (
                              <div className="gi-badge-overlay">
                                <Typography variant="caption">GI Product</Typography>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <CardContent>
                          {item.isAd && (
                            <div className="ad-badge">
                              <Typography variant="caption">Advertisement</Typography>
                            </div>
                          )}
                          {!item.isAd && !item.image && (
                            <div className="gi-badge">
                              <Typography variant="caption">GI Product</Typography>
                            </div>
                          )}
                          {item.sessionTitle && (
                            <Typography variant="subtitle2" className="session-title" color="primary" gutterBottom>
                              {item.sessionTitle}
                            </Typography>
                          )}
                          <Typography variant="h6" className="place-title">{item.place}</Typography>
                          <Typography variant="body2" color="textSecondary" className="time-slot" gutterBottom>
                            {item.time}
                          </Typography>
                          
                          <Typography variant="body2" className="description" paragraph>
                            <strong>Description:</strong> {item.description}
                          </Typography>
                          
                          {item.experience && (
                            <Typography variant="body2" className="experience" paragraph>
                              <strong>Experience:</strong> {item.experience}
                            </Typography>
                          )}
                          
                          {item.nearbyAttraction && (
                            <Typography variant="body2" className="nearby-attraction" paragraph>
                              <strong>Nearby Attraction:</strong> {item.nearbyAttraction}
                            </Typography>
                          )}
                          
                          <Box className="map-container" mt={2} mb={2}>
                            <div dangerouslySetInnerHTML={{ __html: item.mapEmbed }}></div>
                          </Box>
                          
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => window.open(`https://www.google.com/maps/search/?q=${item.place}`, '_blank')}
                            fullWidth
                            className="direction-button"
                          >
                            Get Directions
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </div>

      {/* Footer Section */}
      <footer 
        className="footer-section" 
        style={{
          background: 'linear-gradient(135deg, #134e13 0%, #2d5a27 25%, #20b2aa 75%, #008b8b 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Traditional Pattern Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20c0-11.046-8.954-20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box py={6}>
            <Grid container spacing={4} alignItems="center">
              {/* Logo Section */}
              <Grid item xs={12} md={4} textAlign="center">
                <Box 
                  mb={2}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'inline-block'
                  }}
                >
                  <img 
                    src="/icons/logo.png" 
                    alt="GI Yatra Logo" 
                    style={{ 
                      width: '120px', 
                      height: 'auto',
                      marginBottom: '8px',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                  />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#ffffff',
                      fontFamily: 'serif',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      letterSpacing: '1px'
                    }}
                  >
                    GI Yatra
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#90ee90',
                      fontStyle: 'italic',
                      mt: 1,
                      fontWeight: 500
                    }}
                  >
                    Discover India's Heritage
                  </Typography>
                </Box>
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12} md={4} textAlign="center">
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 3, 
                      color: '#ffffff',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      borderBottom: '2px solid #90ee90',
                      paddingBottom: '8px',
                      display: 'inline-block'
                    }}
                  >
                    Contact Us
                  </Typography>
                  <Box mb={2}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 2,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#ffffff', 
                          fontWeight: 500,
                          fontSize: '16px'
                        }}
                      >
                        📧 gi-jeevika@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#ffffff',
                          fontWeight: 500,
                          fontSize: '16px'
                        }}
                      >
                        📞 +91 9987654321
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Quick Links */}
              <Grid item xs={12} md={4} textAlign="center">
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 3, 
                      color: '#ffffff',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      borderBottom: '2px solid #90ee90',
                      paddingBottom: '8px',
                      display: 'inline-block'
                    }}
                  >
                    Quick Links
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1.5}>
                    {['Home', 'Explore Products', 'About Us', 'Artisans'].map((link, index) => (
                      <Button 
                        key={index}
                        color="inherit" 
                        sx={{ 
                          color: '#ffffff', 
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 500,
                          padding: '10px 20px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(144, 238, 144, 0.2)',
                            color: '#90ee90',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }
                        }}
                      >
                        {link}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Decorative Divider */}
            <Box mt={6} mb={4}>
              <Box
                sx={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, #90ee90 20%, #ffffff 50%, #90ee90 80%, transparent 100%)',
                  position: 'relative'
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: -1
                }}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #90ee90, #20b2aa)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <Typography sx={{ color: '#ffffff', fontSize: '18px' }}>✨</Typography>
                </Box>
              </Box>
            </Box>

            {/* Copyright */}
            <Box 
              textAlign="center"
              sx={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 500,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  lineHeight: 1.6
                }}
              >
                © 2023 - GI Yatra. All rights reserved.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#90ee90',
                  fontStyle: 'italic',
                  mt: 1,
                  fontWeight: 500
                }}
              >
                Promoting India's Geographical Indication Treasures
              </Typography>
            </Box>
          </Box>
        </Container>
      </footer>
    </div>
  );
};

export default App;
