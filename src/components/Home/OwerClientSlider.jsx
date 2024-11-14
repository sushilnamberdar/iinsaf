import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import company1 from '../../assets/companylogo/mehartech.png';
import company2 from '../../assets/companylogo/iinfra icon.png';
import company3 from '../../assets/companylogo/gju.png';
import company4 from '../../assets/companylogo/iinsaf blood logo.png';
import bgimgcompany1 from '../../assets/backgroundimages/meharetech_back.webp';
import bgimgcompany2 from '../../assets/backgroundimages/iifra_back.webp';
import bgimgcompany3 from '../../assets/backgroundimages/gju_back.webp';
import bgimgcompany4 from '../../assets/backgroundimages/blood banner.jpg';

const OwerClientSlider = () => {
    const [backgroundImage, setBackgroundImage] = useState(bgimgcompany1);

    const testimonials = [
        {
            name: "John Doe",
            profession: "Software Engineer",
            rating: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollitia fugit nihil, aperiam maxime minima consequuntur!",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            background: bgimgcompany1,
        },
        {
            name: "Jane Smith",
            profession: "Graphic Designer",
            rating: 4,
            text: "Nam iste eius velit perferendis voluptatem at atque neque soluta.",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            background: bgimgcompany2,
        },
        {
            name: "Sam Wilson",
            profession: "Marketing Specialist",
            rating: 4,
            text: "Voluptatem at atque neque soluta recusandae aperiam corporis.",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            background: bgimgcompany3,
        },
        {
            name: "Alex Johnson",
            profession: "Business Analyst",
            rating: 5,
            text: "Amazing service! I highly recommend them for all your business needs.",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            background: bgimgcompany4,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        beforeChange: (current, next) => {
            setBackgroundImage(testimonials[next].background);
        },
    };

    return (
        <>
            <div className="relative text-white py-16 mt-10">
                {/* Dynamic Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Our Clients Reviews</h2>
                    <p className="text-lg mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos mollitia fugiat, nihil aperiam tempore.
                    </p>

                    {/* Slick Slider */}
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <div className="glass-effect text-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
                                        <p className="mb-4">"{testimonial.text}"</p>
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-bold">{testimonial.name}</h4>
                                                <p className="text-sm">{testimonial.profession}</p>
                                                <div className="text-yellow-400 mt-1">
                                                    {'★'.repeat(testimonial.rating)}{' '}
                                                    {'☆'.repeat(5 - testimonial.rating)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Marquee for Company Logos */}
            <div className="bg-white overflow-hidden w-full py-4">
                <div className="owerclient-marquee">
                    <div className="flex items-center space-x-32">
                        <img className="h-20" src={company1} alt="Company 1" />
                        <img className="h-20" src={company2} alt="Company 2" />
                        <img className="h-20" src={company3} alt="Company 3" />
                        <img className="h-20" src={company4} alt="Company 4" />
                    </div>
                </div>
            </div>


        </>
    );
};

export default OwerClientSlider;
