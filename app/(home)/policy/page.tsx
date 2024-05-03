import Link from "next/link";

const Policy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        <strong className="font-bold">Data Collection:</strong> We collect
        minimal user data necessary for the functioning of Animunet, such as
        account information and user preferences.
      </p>
      <p className="mb-4">
        <strong className="font-bold">Use of Data:</strong> The data collected
        is used to improve service quality and user experience. We do not share
        personal data with third parties except as required by law.
      </p>
      <p className="mb-4">
        <strong className="font-bold">Cookies and Tracking:</strong> Animunet
        uses cookies and similar tracking technologies to enhance the user
        experience like caching video timestamps and tracking watched content.
      </p>
      <p className="mb-4">
        <strong className="font-bold">Third-Party Services:</strong> Embedded
        videos from third-party sites may have their own privacy policies, and
        we advise users to read these policies on the respective sites.
      </p>
      <p className="mb-4">
        <strong className="font-bold">Security:</strong> We are committed to
        ensuring your data is secure but remind users that no method of
        transmission over the Internet is 100% secure.
      </p>
      <p className="mb-4">
        <strong className="font-bold">Changes to Privacy Policy:</strong> We may
        update our Privacy Policy from time to time. We will notify users of any
        changes by posting the new policy on this page.
      </p>
      <p className="mb-8">
        <strong className="font-bold">Contact Us:</strong> If you have any
        questions about these terms, please contact me at{" "}
        <Link href="avalynndev@gmail.com" className="text-blue-600">
          avalynndev@gmail.com
        </Link>
        .
      </p>
    </div>
  );
};

export default Policy;
