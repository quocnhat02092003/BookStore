import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="lg:flex flex-row gap-10 py-10 lg:px-40 px-10 items-center">
        <img
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710da59cab61c0206467c14_book%20image-1.png"
          alt="Image"
          className="lg:w-[400px] lg:h-[500px] h-[400px] w-[300px] object-cover"
        />
        <div className="flex flex-col gap-5 max-lg:pt-5">
          <div className="flex flex-col gap-2 border-b border-slate-400 pb-5">
            <small>
              By <Link href="/author/1">Robert Fox</Link>
            </small>
            <h3 className="text-3xl">A Novel Designer</h3>
            <div className="flex flex-row items-center gap-2">
              <img
                src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66b213487fa1b0077959ba4a_Frame%20309.png"
                alt="star"
                className="w-20 h-4"
              />
              <p>(5)</p>
            </div>
            <p>$ 14.00 USD</p>
          </div>
          <div className="flex flex-col gap-5">
            <p>
              Effect font move vertical share. Connection frame edit export
              arrow. Undo device move opacity image layer. List star blur
              strikethrough arrow.
            </p>
            <div className="flex flex-row items-center gap-2">
              <input
                type="number"
                min={1}
                max={999}
                defaultValue={1}
                className="border p-2 rounded-md"
              />
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                variant="outline"
              >
                Add to Cart
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <p>
                SKU: <span className="text-slate-400">TNCHP0012U6</span>
              </p>
              <div className="lg:flex flex-row items-center gap-4">
                <p>Share :</p>
                <div className="space-x-2 max-lg:space-y-2">
                  <Button variant="outline">Facebook</Button>
                  <Button variant="outline">Twitter</Button>
                  <Button variant="outline">LinkedIn</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-400 pt-5">
            <p>Payment Method: </p>
            <div className="flex flex-row items-center gap-2">
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                alt="momo"
                className="w-10 h-10"
              />
              <img
                src="https://1400.vn/hotrodieutribenhlao/images/logo-vietqr.png"
                alt="vietqr"
                className="w-25 h-8"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:px-40 px-10">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="lg:text-2xl text-xl">
              Product Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="lg:text-2xl text-xl">
              Shipping Details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express
                shipping ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="lg:text-2xl text-xl">
              Return Policy
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return
                the item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default page;
