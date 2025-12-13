import React from "react";

const Guidelines = () => {
  return (
    <div className="dark:text-white min-h-screen mt-5 mb-5 space-y-5">
      <section className="py-24 px-6 text-center   dark:bg-[#261B25]  bg-secondary rounded-2xl">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Contest Guidelines
        </h1>
        <p className="md:text-xl max-w-2xl mx-auto">
          Follow these rules to ensure a fair and smooth contest experience on
          ContestHub.
        </p>
      </section>

      <section className="mx-auto flex justify-between  rounded-2xl p-5 dark:bg-[#261B25]  bg-secondary">
        <div></div>
        <div>
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

      <section className="  dark:bg-[#261B25]  bg-secondary  rounded-2xl p-5">
        <div></div>
        <div>
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

      <section className="flex justify-between  rounded-2xl p-5 dark:bg-[#261B25]  bg-secondary">
        <div></div>
        <div>
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

      <section className="  dark:bg-[#261B25]  bg-secondary rounded-2xl p-5">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Prize & Winner Rules
        </h2>
        <ul className="list-disc list-inside space-y-3 md:text-lg">
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
            Winners’ achievements may be displayed publicly on the website.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Guidelines;
