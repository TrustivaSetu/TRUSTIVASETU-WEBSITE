import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Us — Trustiva Setu",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <div className="pt-32 sm:pt-36">
        {/* ABOUT */}

        <section
          id="about"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About Trustiva Setu
          </h2>

          <p className="text-gray-300 text-lg leading-8">
            Trustiva is the healthcare financing infrastructure division of
Aarthsetu Technologies Private Limited.

We are building the backbone that powers affordable healthcare access
by enabling financial institutions, hospitals, healthcare providers
and digital partners to work together through one unified financing ecosystem.

Our mission is simple:

"No patient should delay treatment because of financial barriers."

We don't just provide loans—we create the infrastructure layer
that powers healthcare affordability at scale.
          </p>
          <div className="mt-20">
            <h2 className="text-4xl font-bold mb-10">
              Founding Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {/* Abhishek Kashyap */}

              <Link href="/founders/abhishek kashyap" className="block bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
                    <Image
                      src="/abhishek.jpg"
                      alt="Abhishek Kashyap"
                      width={240}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Abhishek Kashyap
                </h3>

                <p className="text-lime-300 font-semibold mb-2">
                  Founder & Strategic Vision Lead
                </p>
                <p className="text-gray-300 text-sm mt-2 leading-6">
                  Building India's healthcare financing infrastructure with lender-first execution.
                </p>
                <p className="text-gray-300">
                  Healthcare Finance Infrastructure,
                  Strategic Partnerships,
                  NBFC Ecosystem Development
                </p>
              </Link>

              {/* Ajit Yadav */}

              <Link href="/founders/ajit yadav" className="block bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
                    <Image
                      src="/ajit.jpg"
                      alt="Ajit Yadav"
                      width={240}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Ajit Yadav
                </h3>

                <p className="text-lime-300 font-semibold mb-2">
                  Co-Founder & Growth Strategy Lead
                </p>
                <p className="text-gray-300 text-sm mt-2 leading-6">
                  Driving strategic partnerships, conversion systems and lender expansion.
                </p>
                <p className="text-gray-300">
                  Banking + Fintech,
                  Credit Infrastructure,
                  Lending Operations
                </p>
              </Link>
              {/* Manish Jaggi */}

              <Link href="/founders/manish jaggi" className="block bg-white/10 backdrop-blur-xl border border-lime-300/20 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.02] transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-lime-300/30 shadow-2xl">
                    <Image
                      src="/manish.png"
                      alt="Manish Jaggi"
                      width={240}
                      height={240}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Manish Jaggi
                </h3>

                <p className="text-lime-300 font-semibold mb-2">
                  Strategic Advisor
                </p>

                <p className="text-gray-300 text-sm mt-2 leading-6">
                  Bringing deep banking, NBFC and financial infrastructure expertise
                  to strengthen Trustiva's lender ecosystem and strategic growth.
                </p>

                <p className="text-gray-300">
                  ICICI Bank, TATA Capital, NBFC Strategy,
                  Lending Infrastructure, Financial Advisory
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
