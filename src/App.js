import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaAppleAlt, FaBarcode, FaUsers, FaCookieBite } from 'react-icons/fa';
//import introVideo from './assets/freedge.mov';
import fridgeIn from './assets/fridge.png';
//import profpic from './assets/prof.jpg';
/*
const IntroAnimation = ({ onAnimationComplete }) => {
    return (
        <video
            src={introVideo}
            autoPlay
            muted
            playsInline
            onEnded={onAnimationComplete}
            className="fixed top-0 left-0 w-full h-full object-cover bg-black"
        />
    );
};
*/

const AboutUsWidget = ({ toggleAboutUs }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full relative flex flex-col md:flex-row gap-8 shadow-xl">
                <button
                    onClick={toggleAboutUs}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200 z-10"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="flex-1 text-black">
                    <h2 className="text-3xl font-bold mb-4 font-[Climate_Crisis]">About Us</h2>
                    <p className="mb-4 text-sm text-gray-700">

                    </p>
                    <p className="mb-4 text-sm text-gray-700">
                    </p>
                    <p className="text-sm text-gray-700">
                        Thank you for joining our community!
                    </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center justify-center text-center">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border-4 border-gray-300">
                       
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">Nat</h3>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/talianacia16" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-200"><FaFacebookF size={24} /></a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors duration-200"><FaTwitter size={24} /></a>
                        <a href="https://www.linkedin.com/in/nataliatomala4444" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors duration-200"><FaLinkedinIn size={24} /></a>
                        <a href="https://www.instagram.com/avenatka/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors duration-200"><FaInstagram size={24} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FreedgeWidget = ({ toggleFreedgeWidget }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full relative flex flex-col md:flex-row gap-8 shadow-xl">
                <button
                    onClick={toggleFreedgeWidget}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200 z-10"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="flex-1 w-full text-black">
                    <h2 className="text-3xl font-bold mb-4 font-[Climate_Crisis]">Our Initiative</h2>
                    <p className="mb-4 text-sm text-gray-700">
...
                    </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center justify-center text-center">
                    <div className="w-full h-full md:h-48 rounded-xl overflow-hidden mb-4 border-4 border-gray-300">
                        <a href="https://www.youtube.com/watch?v=your-video-id" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://img.youtube.com/vi/your-video-id/mqdefault.jpg"
                                alt="Freedge YouTube Thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


const SectionOne = React.forwardRef((props, ref) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const phoneY = useTransform(scrollYProgress, [0.5, 0.8], ["0%", "-50%"]);
    const phoneOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    const phoneRotate = useTransform(scrollYProgress, [0.5, 0.8], [0, 10]);

    return (
        <div ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-pink-50">
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] md:text-[8vw] lg:text-[6vw] font-climate text-black z-10 text-center"
            >
                <span className="block leading-none font-[Climate_Crisis]" style={{ lineHeight: '0.7' }} > </span>
                <span className="block leading-none font-[Climate_Crisis]" style={{ lineHeight: '0.7' }}> </span>
                <span className="block leading-none font-[Climate_Crisis]" style={{ lineHeight: '0.7' }}> </span>
                <span className="block leading-none font-[Climate_Crisis]" style={{ lineHeight: '0.7' }}></span>
            </motion.div>

            <motion.div
                className="absolute w-64 h-[28rem] bg-white rounded-[2rem] shadow-xl border-4 border-black z-20"
                style={{ y: phoneY, opacity: phoneOpacity, rotate: phoneRotate }}
            >
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-60 text-center text-sm font-light text-black opacity-50 whitespace-nowrap"></p>
            </motion.div>
        </div>
    );
});

const featureCards = [
    {
        title: "Alerts",
        description: "f1",
        icon: FaAppleAlt,
        color: 'bg-[#ff829b]',
        iconColor: 'text-neutral-900', 
        textColor: 'text-neutral-900', 
        initialX: '-100%',
        initialY: '-100%',
        finalX: '0%',
        finalY: '0%',
    },
    {
        title: "...",
        description: "",
        icon: FaBarcode,
        color: 'bg-[#a5b7e5]',
        iconColor: 'text-neutral-900',
        textColor: 'text-neutral-900', 
        initialX: '100%',
        initialY: '-100%',
        finalX: '0%',
        finalY: '0%',
    },
    {
        title: "...",
        description: "",
        icon: FaUsers,
        color: 'bg-[#fff7a4]',
        iconColor: 'text-neutral-900', 
        textColor: 'text-neutral-900', 
        initialX: '-100%',
        initialY: '100%',
        finalX: '0%',
        finalY: '0%',
    },
    {
        title: "...",
        description: "....",
        icon: FaCookieBite,
        color: 'bg-pink-100',
        iconColor: 'text-neutral-900', 
        textColor: 'text-neutral-900', 
        initialX: '100%',
        initialY: '100%',
        finalX: '0%',
        finalY: '0%',
    },
];

const SectionTwo = React.forwardRef((props, ref) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] 
    });

    const centralTitleOpacity = useTransform(scrollYProgress, [0.05, 0.4], [1, 0]);
    const centralTitleScale = useTransform(scrollYProgress, [0.0, 0.4], [1, 0.8]);

    const fridgeY = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "0%"]);

    const fridgeOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

    const doorRotateY = useTransform(scrollYProgress, [0.7, 0.95], [0, -100]); // roatte from 0 to -100 degrees (outwards, left hinge)
    const doorWidth = useTransform(scrollYProgress, [0.7, 0.95], ["100%", "0%"]); 
    const doorOpacity = useTransform(scrollYProgress, [0.7, 0.95], [1, 0.2]); 

    const contentsOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0.5, 1]); // doors 
    const contentsScale = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [1, 1.02, 1]);
    const contentsBounceY = useTransform(scrollYProgress, [0.7, 0.8, 0.95], ["0%", "-1%", "0%"]);


    const cardTransforms = featureCards.map((card, index) => {
        const start = 0.4;
        const end = 0.7;

        const localStart = start + index * 0.05;
        const localEnd = end;

        const x = useTransform(scrollYProgress, [localStart, localEnd], [card.initialX, card.finalX]);
        const y = useTransform(scrollYProgress, [localStart, localEnd], [card.initialY, card.finalY]);
        const opacity = useTransform(scrollYProgress, [localStart, localEnd], [0, 1]);
        const scale = useTransform(scrollYProgress, [localStart, localEnd], [0.8, 1]);

        return { x, y, opacity, scale };
    });

    return (
        <div ref={containerRef} className="h-[300vh] bg-pink-50 relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-8">

                <motion.div
                    className="absolute z-10 text-center"
                    style={{ opacity: centralTitleOpacity, scale: centralTitleScale }}
                >
                    <h2 className="text-[12vw] md:text-[8vw] font-bold font-[Climate_Crisis] text-black leading-none">
                        ...
                    </h2>
                    <h2 className="text-[12vw] md:text-[8vw] font-bold font-[Climate_Crisis] text-black leading-none mt-[-2vw]">
                        ...
                    </h2>
                </motion.div>

                <div className="relative w-full h-full max-w-7xl flex items-center justify-center">


                    <motion.div
                        className="absolute w-64 h-[28rem] bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex items-center justify-center border-0 border-gray-900"
                        style={{ opacity: fridgeOpacity, y: fridgeY, perspective: '1000px' }}
                    >
                        <motion.img 
                            src={fridgeIn}
                            className="w-full h-full object-cover"
                            style={{ opacity: contentsOpacity, scale: contentsScale, y: contentsBounceY }}
                        />

                        <motion.div
 className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-xl shadow-xl transform origin-left"
                            style={{
                                width: doorWidth,
                                opacity: doorOpacity,
                                rotateY: doorRotateY,
                                border: '0px solid #000',
                            }}
                        >
                            <div className="absolute right-[-8px] top-1/2 w-2 h-16 bg-gray-500 rounded-full shadow-lg"></div>
                        </motion.div>
                    </motion.div>

                    {featureCards.map((card, index) => {
                        const transform = cardTransforms[index];
                        const CardIcon = card.icon;

                        const positionClasses = [
                            "top-[10%] left-[5%]",
                            "top-[10%] right-[5%]",
                            "bottom-[10%] left-[5%]",
                            "bottom-[10%] right-[5%]",
                        ];

                        return (
                            <motion.div
                                key={index}
                                className={`absolute hidden lg:block w-64 rounded-xl p-6 shadow-xl ${card.color} ${positionClasses[index]} z-20 cursor-pointer`}
                                style={{ x: transform.x, y: transform.y, opacity: transform.opacity, scale: transform.scale }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)" }}
                            >
                                <div className="flex flex-col h-full">
                                    <div className={`text-4xl ${card.iconColor} mb-4`}>
                                        <CardIcon />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 ${card.textColor}`}>{card.title}</h3>
                                    <p className={`text-sm ${card.textColor} flex-1`}>{card.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

const SectionThree = React.forwardRef((props, ref) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const ctaScale = useTransform(scrollYProgress, [0.3, 0.5], [0.3, 0.95]);
    const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
    const ctaY = useTransform(scrollYProgress, [0.5, 0.8], ["10%", "0%"]);

    const initialTextOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

    return (
        <div ref={ref} className="h-[90vh] bg-pink-50 flex flex-col items-center justify-center text-center p-12 relative">
            <motion.h2
                className="absolute text-5xl font-bold font-[Climate_Crisis] text-black"
                style={{ opacity: initialTextOpacity }}
            >...
            </motion.h2>

            <motion.div
                className="w-full h-full max-w-5xl bg-black border-4 border-black rounded-[2.5rem] p-12 flex flex-col items-center justify-center shadow-lg"
                style={{ scale: ctaScale, opacity: ctaOpacity, y: ctaY }}
            >
                {/* Poprawione klasy rozmiaru tekstu na responsywne klasy Tailwind */}
                <h2 className="text-[8vw] md:text-5xl font-[Climate_Crisis] text-white leading-none"> <br/> </h2>
                <a
                    href="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        mt-8 px-8 py-4 bg-white text-black rounded-full font-bold shadow-lg
                        border-2 border-black
                        transform hover:scale-105
                        hover:bg-black hover:text-white
                        transition-all duration-300
                    "
                >
                    GET BLLRD
                </a>
            </motion.div>
        </div>
    );
});


const SectionFour = React.forwardRef(({ toggleAboutUs, toggleFreedgeWidget, scrollToSupport }, ref) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const backgroundColor = useTransform(scrollYProgress, [0.5, 0.7], ["#FDE8E8", "#B6C2DB"]);

    return (
        <motion.div
            ref={ref}
            className="w-full relative min-h-[90vh] pt-24 pb-0 flex flex-col justify-between"
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto w-full px-8 md:px-16 flex flex-col md:flex-row gap-12 justify-center items-center">
                <div className="bg-black text-white rounded-3xl p-5 border-2 border-white w-full max-w-md">
                    <h3 className="text-3xl font-bold font-[Climate_Crisis] mb-6 text-center">SIGN UP TO NEWSLETTER</h3>
                    <input
                        type="email"
                        placeholder="enter your email address"
                        className="w-full h-12 rounded-full mb-4 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-green-300 transition-all bg-transparent placeholder-white border border-white"
                    />
                    <button
                        className="
                            w-full px-6 py-3 bg-green-300 text-black rounded-full font-bold
                            border-2 border-green-300
                            transform hover:scale-105
                            hover:bg-transparent hover:text-green-300
                            transition-all duration-300
                        "
                    >
                        SUBSCRIBE
                    </button>
                    <p className="mt-4 text-[0.6rem] text-center opacity-70">
                        *I allow getting newsletter messages to my email address
                    </p>
                </div>

                <div className="bg-white text-black rounded-3xl p-5 border-2 border-black w-full max-w-md">
                    <h3 className="text-3xl font-bold font-[Climate_Crisis] mb-6 text-center">DONATE</h3>
                    <input
                        type="number"
                        placeholder="enter amount in $"
                        className="w-full h-12 rounded-full mb-4 px-4 text-black text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all bg-transparent placeholder-gray-500 border border-gray-300"
                    />
                    <a
                        href="https://www.buymeacoffee.com/your-username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            w-full px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-center inline-block
                            border-2 border-pink-500
                            transform hover:scale-105
                            hover:bg-transparent hover:text-pink-500
                            transition-all duration-300
                        "
                    >
                        THANKS!
                    </a>
                    <p className="mt-4 text-[0.6rem] text-center opacity-70">
                        *all donates are voluntary
                    </p>
                </div>
            </div>

            <footer className="w-full mt-24 bg-black"> {/* Zmieniony kolor tła na czarny, aby pasował do koloru tekstu hover */}
                <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 flex flex-col md:flex-row justify-between items-start text-white"> {/* Zmieniony kolor tekstu na biały */}
                    <div className="flex flex-col items-start mb-6 md:mb-0">
                        <div className="flex flex-col text-2xl font-black leading-none">
                            <span>...</span>
                            <span>...</span>
                        </div>
                        <p className="text-sm">....</p>
                    </div>

                    <div className="flex gap-12 font-bold mb-6 md:mb-0">
                        <a href="#" className="hover:text-pink-400" onClick={toggleFreedgeWidget}>BLLRD</a> {/* Zmieniony hover, aby był widoczny na czarnym tle */}
                        <a href="#" className="hover:text-pink-400" onClick={toggleAboutUs}>ABOUT US</a> {/* Zmieniony hover */}
                        <a href="#" className="hover:text-pink-400" onClick={scrollToSupport}>CONTACT</a> {/* Zmieniony hover */}
                    </div>

                    <div className="flex gap-2">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-white hover:ring-offset-2 transition-all duration-300">
                            <FaFacebookF className="text-black text-lg" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-white hover:ring-offset-2 transition-all duration-300">
                            <FaTwitter className="text-black text-lg" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-white hover:ring-offset-2 transition-all duration-300">
                            <FaInstagram className="text-black text-lg" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-white hover:ring-offset-2 transition-all duration-300">
                            <FaLinkedinIn className="text-black text-lg" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:ring-2 hover:ring-white hover:ring-offset-2 transition-all duration-300">
                            <FaYoutube className="text-black text-lg" />
                        </a>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
});

const FeaturesDropdown = React.forwardRef(({ onClose }, ref) => ( // Dodano React.forwardRef
    <div ref={ref} className="features-dropdown-container absolute top-full left-0 w-full bg-white text-black py-16 shadow-lg border-b-2 border-gray-200 z-50">
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200 z-10"
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <div className="container mx-auto px-4 md:px-16 flex justify-between gap-12">
            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
                <motion.div
                    className="rounded-3xl p-6 flex flex-col justify-between bg-[#ff829b] opacity-90 hover:opacity-100"
                    whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }} 
                >
                    <h3 className="text-3xl font-bold text-black">...</h3>
                    <p className="text-sm text-justify text-black"></p>
                    <div className="mt-4 flex gap-4">
                        <motion.div
                            className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-center"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <span className="text-2xl font-bold text-black"><FaAppleAlt/></span> 
                        </motion.div>
                        <motion.div
                            className="bg-white rounded-2xl p-4 shadow-md flex-1"
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        >
                            <p className="text-sm font-semibold text-gray-700">  </p>
                            <p className="text-sm text-gray-500">     </p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-[#a5b7e5] opacity-90 hover:opacity-100 rounded-3xl p-6 flex flex-col justify-between"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                    <h3 className="text-3xl font-bold text-black">...</h3>
                    <p className="text-sm text-justify text-black">....</p>
                    <div className="mt-4 flex gap-4 items-center">
                        <motion.div
                            className="bg-white rounded-2xl p-4 shadow-md flex-1"
                            whileHover={{ x: -5, transition: { duration: 0.2 } }}
                        >
                            <p className="text-sm font-semibold text-gray-700">...</p>
                            <p className="text-sm text-gray-500">      </p>
                        </motion.div>
                        <motion.div
                            className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center"
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        >
                             <FaBarcode className="text-3xl text-black"/>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-[#fff7a4] opacity-90 hover:opacity-100 rounded-3xl p-6 flex flex-col justify-between" // Usunięty text-white
                    whileHover={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0,0,0,0.2)", transition: { duration: 0.3 } }}
                >
                    <h3 className="text-3xl font-bold text-black">...</h3>
                    <p className="text-sm text-justify opacity-80 text-black">....</p>
                    <div className="mt-4 flex flex-col gap-4">
                        <motion.div
                            className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-700">   </span>
                        </motion.div>
                        <motion.div
                            className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <div className="w-10 h-10 bg-pink-200 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-700">    </span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-pink-200 opacity-90 hover:opacity-100 rounded-3xl p-6 flex flex-col justify-between"
                    whileHover={{ rotateY: 0, transition: { duration: 0.3 } }} // Usunięta rotacja dla lepszej czytelności
                >
                    <h3 className="text-3xl font-bold text-black"></h3>
                    <p className="text-sm text-black"></p>
                    <div className="mt-4 flex items-center justify-center">
                        <motion.div
                            className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center"
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        >
                            <FaCookieBite className="text-4xl text-black"/>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="flex-1 max-w-xs pl-8"> {/* Dodany padding/margin by oddzielić sekcje */}
                <h4 className="text-gray-400 text-sm font-bold">Explore more</h4>
                <ul className="mt-2 space-y-2 text-lg font-semibold">
                    <li><a href="#" className="hover:text-pink-600" onClick={onClose}></a></li>
                    <li><a href="#" className="hover:text-pink-600" onClick={onClose}></a></li>
                    <li><a href="#" className="hover:text-pink-600" onClick={onClose}></a></li>
                    <li><a href="#" className="hover:text-pink-600" onClick={onClose}></a></li>
                    <li><a href="#" className="hover:text-pink-600" onClick={onClose}></a></li>
                </ul>
                <div className="mt-12">
                    <h4 className="text-gray-400 text-sm font-bold">About Freedge</h4>
                    <ul className="mt-2 space-y-2 text-lg font-semibold">
                        <li><a href="#" className="hover:text-pink-600" onClick={onClose}>FAQs</a></li>
                        <li><a href="#" className="hover:text-pink-600" onClick={onClose}>Support</a></li>
                        <li><a href="#" className="hover:text-pink-600" onClick={onClose}>Newsletter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
));

const SupportDropdown = React.forwardRef(({ onClose }, ref) => { 
    const [openIndex, setOpenIndex] = useState(null);
    const faqItems = [
        {
            question: 'How do I create an account?',
            answer: 'To create an account, go to the "Log in" section and select the "Create new account" option. Follow the instructions to complete your data.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'The fastest way is to use the contact form next to this section. You can also send us an email at support@freedge.com.'
        },
        {
            question: 'Is the app free?',
            answer: 'Yes, our application is completely free. We offer optional premium features that can be activated at any time.'
        },
    ];

    const togglePanel = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div ref={ref} className="support-dropdown-container absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white text-black py-16 shadow-lg border-b-2 border-black z-40">
            
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200 z-10"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                    <h4 className="text-4xl font-bold mb-6 font-[Climate_Crisis] text-center md:text-left">FAQ</h4>
                    {faqItems.map((item, index) => (
                        <div key={index} className="border-b-2 border-gray-200">
                            <div
                                className="font-semibold cursor-pointer py-4 flex justify-between items-center rounded-lg px-2 transition-all duration-300 ease-in-out hover:bg-gray-100" // Zmniejszony px z 10 na 2
                                onClick={() => togglePanel(index)}
                            >
                                {item.question}
                                <span className="text-lg font-bold">{openIndex === index ? '−' : '+'}</span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-600 text-sm pl-2">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/3 bg-gray-100 rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                
                        <input type="email" placeholder="Your email" className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-sm" />
                        <textarea placeholder="Your message" className="w-full p-3 border border-gray-300 rounded-lg mb-6 h-32 text-sm"></textarea>
                        <button className="w-full bg-black text-white px-4 py-3 rounded-full hover:bg-gray-800 font-semibold transition-colors duration-200">Send Message</button>
                    </div>

                    <div className="flex justify-center md:justify-center gap-4 mt-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                            <FaLinkedinIn size={24} />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
});

const Navbar = ({ donateRef, toggleAboutUs, toggleFreedgeWidget, handleSupportClick, handleFeaturesClick, isFeaturesOpen, isSupportOpen, setIsFeaturesOpen, setIsSupportOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Zmieniona logika, by Navbar używał zewnętrznych stanów
    const handleFeatures = (e) => {
        e.preventDefault();
        handleFeaturesClick();
        setIsMobileMenuOpen(false);
    };

    const handleSupport = (e) => {
        e.preventDefault();
        handleSupportClick();
        setIsMobileMenuOpen(false);
    };

    const handleMobileMenuClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsFeaturesOpen(false);
        setIsSupportOpen(false);
    };

    const handleDonateClick = (e) => {
        e.preventDefault();

        if (donateRef && donateRef.current) {
            donateRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        setIsMobileMenuOpen(false);
    };
    
 
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const initialNavbarStyle = "bg-white text-black shadow-lg rounded-[3rem] px-8 py-4";
    const scrolledNavbarStyle = "bg-black text-white rounded-full px-8 py-3"; // Poprawione style paska przewijania

    return (
        <>
            <header
                className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl
                ${isScrolled ? scrolledNavbarStyle : initialNavbarStyle}`}
            >
                <div className="flex justify-between items-center relative">
                    <div className="flex flex-col text-2xl font-black leading-none">
                        <span></span>
                        <span>...</span>
                    </div>

                    {/* Nawigacja dla stanu niescrollowanego */}
                    {!isScrolled && (
                        <nav className="hidden md:flex space-x-2 text-sm font-semibold">
                            <a href="#" onClick={handleFeatures} className="hover:bg-gray-200 hover:text-gray-900 px-4 py-2 rounded-full transition-all duration-300">FEATURES</a>
                            <a href="#" onClick={handleSupport} className="hover:bg-gray-200 hover:text-gray-900 px-4 py-2 rounded-full transition-all duration-300">SUPPORT</a>
                            <a
                                href="#"
                                onClick={handleDonateClick}
                                className="hover:bg-gray-200 hover:text-gray-900 px-4 py-2 rounded-full transition-all duration-300"
                            >
                                DONATE
                            </a>
                        </nav>
                    )}
                    
                    {/* Nawigacja dla stanu scrollowanego */}
                    {isScrolled && (
                         <nav className="hidden md:flex space-x-2 text-sm font-semibold">
                            <a href="#" onClick={handleFeatures} className="hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300">FEATURES</a>
                            <a href="#" onClick={handleSupport} className="hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300">SUPPORT</a>
                            <a
                                href="#"
                                onClick={handleDonateClick}
                                className="hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300"
                            >
                                DONATE
                            </a>
                        </nav>
                    )}


                    <div className="flex gap-4 items-center">
                        {isScrolled ? (
                            <>
                               
                                <a
                                    href="https://play.google.com/store/apps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold border-2 border-white transform hover:scale-105 hover:bg-transparent hover:text-white transition-all duration-300"
                                >
                                    GET BLLRD
                                </a>
                                
                                <button
                                    onClick={handleMobileMenuClick}
                                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center md:hidden" // Dodano md:hidden
                                >
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="hidden md:block w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors duration-200">
                                    <span>&#9788;</span> 
                                </button>
                               
                                <a
                                    href="https://play.google.com/store/apps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold border-2 border-black transform hover:scale-105 hover:bg-white hover:text-black transition-all duration-300 hidden md:block" // Dodany hidden md:block
                                >
                                    GET BLLRD
                                </a>
                                <button
                                    onClick={handleMobileMenuClick}
                                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center md:hidden"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {isFeaturesOpen && <FeaturesDropdown onClose={() => setIsFeaturesOpen(false)} />}
                {isSupportOpen && <SupportDropdown onClose={() => setIsSupportOpen(false)} />} 
                {isMobileMenuOpen && (
                    <div className={`absolute right-0 top-20 rounded-2xl shadow-lg p-6 w-48 space-y-4 md:hidden
                        ${isScrolled ? 'bg-white text-black' : 'bg-black text-white'}`}
                    >
                        <a href="#" className="block hover:text-pink-500" onClick={handleFeatures}>FEATURES</a>
                        <a href="#" className="block hover:text-pink-500" onClick={handleSupport}>SUPPORT</a>
                        <a href="#donate" className="block hover:text-pink-500" onClick={handleDonateClick}>DONATE</a>
                        <a
                            href="https://play.google.com/store/apps"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-bold text-center mt-4"
                        >
                            GET BLLRD
                        </a>
                    </div>
                )}
            </header>
        </>
    );
};


const ScrollIndicator = ({ activeSection }) => {
    const dots = [0, 1, 2, 3];
    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
            <div className="w-2 h-48 bg-gray-900/50 rounded-full relative flex flex-col items-center justify-center space-y-2 py-4">
                {dots.map((index) => (
                    <div
                        key={index}
                        className={`
                            transition-all duration-300 ease-in-out
                            ${activeSection === index
                                ? "w-4 h-4 bg-white rounded-full border-2 border-black" // Zmieniono na bardziej widoczne kropki
                                : "w-2 h-2 bg-white/40 rounded-full"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};


const App = () => {
 const [showIntro, setShowIntro] = useState(false); 
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showFreedgeWidget, setShowFreedgeWidget] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    const sectionOneRef = useRef(null);
    const sectionTwoRef = useRef(null);
    const sectionThreeRef = useRef(null);
    const sectionFourRef = useRef(null);
    const donateRef = sectionFourRef;
    const supportRef = useRef(null); 

    const [activeSection, setActiveSection] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleAnimationComplete = () => {
        setShowIntro(false);
    };

    const toggleAboutUs = () => {
        setShowAboutUs(!showAboutUs);
    };

    const toggleFreedgeWidget = () => {
        setShowFreedgeWidget(!showFreedgeWidget);
    };
    

    const handleFeaturesClick = () => {
        setIsFeaturesOpen(!isFeaturesOpen);
        setIsSupportOpen(false); // Zamknij inne
    };

    const handleSupportClick = () => {
        setIsSupportOpen(!isSupportOpen);
        setIsFeaturesOpen(false); // Zamknij inne
    };


    // Funkcja przewijająca do SupportDropdown
    const scrollToSupport = () => {
        // Upewnij się, że Dropdown jest otwarty, aby scrollowanie miało cel
        setIsSupportOpen(true);
        setIsFeaturesOpen(false);

        // Użyj timeoutu, aby dać Reactowi czas na renderowanie Dropdowna przed przewinięciem
        setTimeout(() => {
            if (supportRef.current) {
                supportRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    const handleClickOutside = (event) => {
        const featuresDropdown = document.querySelector('.features-dropdown-container');
        const supportDropdown = document.querySelector('.support-dropdown-container');
        const navbar = document.querySelector('header');

        if (navbar && !navbar.contains(event.target) &&
            (!featuresDropdown || !featuresDropdown.contains(event.target)) &&
            (!supportDropdown || !supportDropdown.contains(event.target))) {
            setIsFeaturesOpen(false);
            setIsSupportOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Uruchamia się tylko raz, by ustawić globalny event listener

    useEffect(() => {
        if (!showIntro) {
            const sections = [sectionOneRef, sectionTwoRef, sectionThreeRef, sectionFourRef];
            const observerOptions = {
                root: null,
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            };

            const observer = new IntersectionObserver((entries) => {
                let currentActiveIndex = -1;
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = sections.findIndex(ref => ref.current === entry.target);
                        currentActiveIndex = index;
                    }
                });

                if (currentActiveIndex !== -1) {
                    setActiveSection(currentActiveIndex);
                }
            }, observerOptions);

            sections.forEach(ref => {
                if (ref.current) {
                    observer.observe(ref.current);
                }
            });

            return () => {
                sections.forEach(ref => {
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                });
            };
        }
    }, [showIntro]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (showIntro) {
        return <IntroAnimation onAnimationComplete={handleAnimationComplete} />;
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar 
                isScrolled={isScrolled} 
                donateRef={donateRef} 
                toggleAboutUs={toggleAboutUs} 
                toggleFreedgeWidget={toggleFreedgeWidget} 
                handleFeaturesClick={handleFeaturesClick} // Przekazano funkcję do zmiany stanu
                handleSupportClick={handleSupportClick} // Przekazano funkcję do zmiany stanu
                isFeaturesOpen={isFeaturesOpen}
                isSupportOpen={isSupportOpen}
                setIsFeaturesOpen={setIsFeaturesOpen}
                setIsSupportOpen={setIsSupportOpen}
                scrollToSupport={scrollToSupport} // Przekazano funkcję scrollowania
            />
            <ScrollIndicator activeSection={activeSection} />
            <main>
                <SectionOne ref={sectionOneRef} />
                <SectionTwo ref={sectionTwoRef} />
                <SectionThree ref={sectionThreeRef} />
                <SectionFour ref={sectionFourRef} toggleAboutUs={toggleAboutUs} toggleFreedgeWidget={toggleFreedgeWidget} scrollToSupport={scrollToSupport} />
            </main>
            {showAboutUs && <AboutUsWidget toggleAboutUs={toggleAboutUs} />}
            {showFreedgeWidget && <FreedgeWidget toggleFreedgeWidget={toggleFreedgeWidget} />}
            {isFeaturesOpen && <FeaturesDropdown onClose={() => setIsFeaturesOpen(false)} />}
            {isSupportOpen && <SupportDropdown ref={supportRef} onClose={() => setIsSupportOpen(false)} />}
        </div>
    );
};

export default App;