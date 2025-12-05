"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { House, Mail, Phone } from "lucide-react";
import React from "react";

const ContactPage = () => {
  React.useEffect(() => {
    document.title = "Contact Us - BookStoreX";
  }, []);
  return (
    <div>
      <div className="text-center mt-20 px-10">
        <h1 className="lg:text-6xl text-2xl font-bold">
          Need Help? Reach Out to Our Team <br /> for Assistance Here
        </h1>
        <div className="flex flex-row flex-wrap justify-center mt-5 xl:px-40 gap-10">
          <div className="flex flex-col items-center lg:mt-20 mt-5 gap-5 p-20 rounded-2xl bg-green-100 hover:bg-green-200 cursor-pointer duration-500">
            <div className="p-5 rounded-full bg-green-600">
              <House />
            </div>
            <h2 className="text-2xl">Visit our office</h2>
            <address>Ho Chi Minh City, Vietnam</address>
          </div>
          <div className="flex flex-col items-center lg:mt-20 mt-5 gap-5 p-20 rounded-2xl bg-green-100 hover:bg-green-200 cursor-pointer duration-500">
            <div className="p-5 rounded-full bg-green-600">
              <Phone />
            </div>
            <h2 className="text-2xl">Call Us</h2>
            <p>(+84) 796-704-249</p>
          </div>
          <div className="flex flex-col items-center lg:mt-20 mt-5 gap-5 p-20 rounded-2xl bg-green-100 hover:bg-green-200 cursor-pointer duration-500">
            <div className="p-5 rounded-full bg-green-600">
              <Mail />
            </div>
            <h2 className="text-2xl">Visit our email</h2>
            <p>quocnhat02092003@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="lg:flex flex-row items-center mt-20 gap-10 lg:mx-20 mx-5">
        <div className="lg:flex flex-col justify-center px-10 mt-20 mb-10 gap-5 bg-slate-100 p-10 rounded-2xl">
          <h2 className="lg:text-4xl text-2xl">Get in touch</h2>
          <p>
            Contact me directly for inquiries, collaborations, or to share your
            thoughts. I&apos;m eager to connect and discuss our interests.
          </p>
          <div className="lg:grid grid-cols-2 gap-5">
            <Input required placeholder="Name" className="mt-5" />
            <Input required placeholder="Email" className="mt-5" />
          </div>
          <div className="lg:grid grid-cols-2 gap-5">
            <Input required placeholder="Phone" className="mt-5" />
            <Input required placeholder="Subject" className="mt-5" />
          </div>
          <Textarea required placeholder="Message" className="mt-5" />
          <Button type="submit" className="mt-5 w-fit">
            Send Message
          </Button>
        </div>
        <div>
          <iframe
            loading="lazy"
            className="lg:w-[30vw] lg:h-[30vw] h-[70vw] w-full rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13366.05523058367!2d-77.02362845330433!3d38.88825052169555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b798ecb5b2c7%3A0xc7edf0c4a86f75af!2sSmithsonian%20National%20Museum%20of%20Natural%20History!5e0!3m2!1sen!2sbd!4v1717051795319!5m2!1sen!2sbd"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
