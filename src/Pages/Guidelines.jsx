import React from "react";
import Title from "../Components/Title/Title";

const Guidelines = () => {
  return (
    <div className="pt-5 pb-10 space-y-5 px-4">
      <section className="text-center rounded-2xl">
        <Title>Contest Guidelines</Title>
        <p className="md:text-xl max-w-2xl mx-auto mt-4">
          Follow these rules to ensure a fair and smooth contest experience on
          ContestHub.
        </p>
      </section>

      <section className="flex flex-col md:flex-row items-start gap-8 rounded-2xl p-5 md:p-8 dark:bg-[#261B25] bg-secondary">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="General Guidelines"
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            General Instructions
          </h2>
          <ul className="list-disc list-inside space-y-3 md:text-lg">
            <li>
              All participants must have a registered account on ContestHub.
            </li>
            <li>
              Ensure your profile information is accurate before joining
              contests.
            </li>
            <li>Payment must be completed to register for a contest.</li>
            <li>Respect deadlines. Late submissions will not be considered.</li>
            <li>
              Each user can participate only once per contest unless specified
              otherwise.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start gap-8 rounded-2xl p-5 md:p-8 dark:bg-[#261B25] bg-secondary">
        <div className="md:w-2/3 order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Contest Requirements
          </h2>
          <ul className="list-disc list-inside space-y-3 md:text-lg">
            <li>
              Submissions must be original work created by the participant.
            </li>
            <li>
              Follow specific format requirements (e.g., file type, size) as
              mentioned in contest details.
            </li>
            <li>
              Ensure submissions do not contain any copyrighted or offensive
              material.
            </li>
            <li>
              Include proper credits and references if using third-party assets.
            </li>
            <li>
              Submit before the deadline to avoid last-minute technical issues.
            </li>
          </ul>
        </div>
        <div className="md:w-1/3 flex justify-center order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Contest Requirements"
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start gap-8 rounded-2xl p-5 md:p-8 dark:bg-[#261B25] bg-secondary">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Contest Conduct"
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Contest Conduct
          </h2>
          <ul className="list-disc list-inside space-y-3 md:text-lg">
            <li>
              Maintain a respectful and professional tone while interacting with
              other users.
            </li>
            <li>
              Any form of cheating, manipulation, or fraudulent activity is
              strictly prohibited.
            </li>
            <li>Report any suspicious activity to the admin immediately.</li>
            <li>
              Creators should provide clear and fair judging criteria for
              participants.
            </li>
            <li>
              Admins have the final authority on any disputes or rule
              clarifications.
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl p-5 md:p-8 dark:bg-[#261B25] bg-secondary">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Prize & Winner Rules"
            className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-lg mb-6"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Prize & Winner Rules
          </h2>
        </div>
        <ul className="list-disc list-inside space-y-3 md:text-lg max-w-3xl mx-auto">
          <li>
            Winners are declared by contest creators after the contest deadline.
          </li>
          <li>
            Prize money will be awarded only to legitimate and verified
            accounts.
          </li>
          <li>
            Any form of fake submission or false claim will disqualify
            participants.
          </li>
          <li>
            ContestHub and creators are not responsible for technical issues
            during submission.
          </li>
          <li>
            Winners' achievements may be displayed publicly on the website.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Guidelines;