import Head from "next/head";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import baseUrl from "../../components/baseUrl";
import { ethers } from "ethers";
import { useRouter } from "next/router";
function list() {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [provider, setProvider] = useState();

  useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      // window.ethereum is defined
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
      // window.ethereum is undefined
      console.log();
    }
    Axios.get(`${baseUrl}/api/get`)
      .then((res) => setRequests(res.data))
      .catch((err) => alert("Could not fetch data"));
  }, []);

  const getConnectedAddress = async () => {
    try {
      // Get the signer
      const signer = provider.getSigner();

      // Get the connected address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const router = useRouter();
  const handleAccept = async (rid) => {
    let supp_address = await getConnectedAddress();
    Axios.post(`${baseUrl}/api/update`, {
      req_id: rid,
      supporter_address: supp_address,
    })
      .then(() => router.push(`/mentorchat/${rid}`))
      .catch((err) => {
        console.log(err);
        alert("An error occurred, please try again");
      });
  };

  return (
    <>
      {requests.length == 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Head>
            <title>ChainAid | Mentor</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            {requests.map((request, index) => {
              return (
                <div className="card rounded m-5 bg-black w-full p-5 shadow-md lg:max-w-lg">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">
                      Request ID: {request.req_id}
                    </h3>
                    <p className="text-gray-600">{request.description}</p>
                  </div>
                  <button
                    className="border border-light px-5 py-2 rounded my-3"
                    onClick={() => handleAccept(request.req_id)}
                  >
                    Accept
                  </button>
                </div>
              );
            })}
          </main>
        </div>
      )}
    </>
  );
}

export default list;
