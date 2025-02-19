/* eslint-disable @next/next/no-img-element */
import { storageBucket } from "@/utils/firestoreConfig";
import { LoadingOverlay, Paper, Text, Tooltip } from "@mantine/core";
import { ref } from "firebase/storage";
import Link from "next/link";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { BsPerson } from "react-icons/bs";
import Checkmark from "../custom-components/checkmark";

const verificationTooltip = "Endorsed for its official connection with the named organization, this community is proudly verified.";

interface CommmunityCardProps {
  id: string;
  description: string;
  country: string;
  location: string;
  name: string;
  members: number;
  logoUrl: string;
  verified: boolean;
}
export default function CommmunityCard(communinty: CommmunityCardProps) {
  const [logoImage, loading] = useDownloadURL(ref(storageBucket, `logos/${communinty.logoUrl}`));
  return (
    <Link href={`/communities/${communinty.id}`}>
      <Paper key={communinty.id} className="group relative mb-8 rounded-lg shadow-lg">
        <div className="relative ">
          <LoadingOverlay visible={loading} />
          <p className="absolute top-0 hidden w-full text-center group-hover:inline ">{communinty.description}</p>
          <img src={logoImage ?? "/img/hero.jpg"} alt="Cover Photo" className="h-56 w-full rounded-t-lg object-cover group-hover:opacity-20" />
        </div>

        <div className="my-2 p-4">
          <Text color="dimmed" className="text-xs font-bold">
            {communinty.country} , {communinty.location}
          </Text>
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <h3 className="mr-2 flex grow items-center justify-between">{communinty.name}</h3>
              {communinty.verified && (
                <Tooltip withArrow label={verificationTooltip} arrowSize={5}>
                  <Text>
                    <Checkmark />
                  </Text>
                </Tooltip>
              )}
            </div>
            <span className="flex items-center text-lg ">
              <BsPerson className="" /> <span className="text-xs ">{communinty.members}</span>
            </span>
          </div>
        </div>
      </Paper>
    </Link>
  );
}
