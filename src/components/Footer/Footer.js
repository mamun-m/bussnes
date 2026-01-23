import './Footer.css';
const Footer = () => {
  return (
    <div className="footerContainer">
      <footer className="footerTop">
        <div className="footerfirstTop footerlastContent">
          <h3>এখনই কিনুন</h3>
          <p>
            ❤️ বিশ্বাসযোগ্যতা নিশ্চিত
            <br />
            হাজার হাজার খুশি গ্রাহক আমাদের বিশ্বাস করেছেন। আমরা বিশ্বাস করি, ভালো পণ্য সবসময় মনে
            রাখার মতো অভিজ্ঞতা দেয়। তাই আমাদের প্রতিটি পণ্য কঠোর মান নিয়ন্ত্রণের মাধ্যমে নির্বাচিত।
          </p>
        </div>
        <div className="footerlastContent">
          <h3>আমাদের মূল বৈশিষ্ট্যসমূহ:</h3>
          <div>
            <p>যা আপনি বিশ্বাস করতে পারেন এমন মানের পণ্য</p>
            <p>নিশ্চিন্তে কেনাকাটা করুন</p>
            <p>আপনার দোরগোড়ায় মানসম্মত পণ্য পৌঁছে দিচ্ছি</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">আপনার বিশ্বস্ত অনলাইন শপিং পার্টনার</h3>
        <div className="footerlastContent">
          <h3>যোগাযোগ করুন:</h3>
          <div>
            <p>ফোন: ০৪৫৪৫৪৫৪৫৪৫</p>
            <p>ইমেইল: rimon@gmail.com</p>
          </div>
        </div>
      </footer>
      <footer className="footerBottom">
        <strong> Copyright 2026 © mohammad mamun . All Right Reserved.</strong>
      </footer>
    </div>
  );
};

export default Footer;
