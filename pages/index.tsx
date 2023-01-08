import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import Term, { TermProps } from "../components/Term";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  //   const res = await fetch("http://localhost:3001/api/today");
  //   const today = await res.json();
  //
  //   return {
  //     props: {
  //       today,
  //     },
  //   };
  //   console.log("today");

  const apiToday = await fetch("http://api.madefor.earth/api/today");
  const todaysatmosphericReadings = await apiToday.json();

  const feed = await prisma.term.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  const allTerms = await prisma.term.findMany({
    where: {
      published: true,
    },
  });

  const allSources = await prisma.source.findMany({
    where: {
      published: true,
    },
  });

  const allLanguages = await prisma.language.findMany({
    where: {
      published: true,
    },
  });

  // let data = feed.reduce((r, e) => {
  //   let group = e.title[0];
  //   if (!r[group]) r[group] = { group, children: [e] };
  //   else r[group].children.push(e);
  //   return r;
  // }, {});

  // let result = Object.values(data);
  let numberOfTerms = allTerms.length;
  let numberOfLanguages = allLanguages.length;
  let numberOfContributors = allSources.length;
  let atmosphericReadings = Object.values(todaysatmosphericReadings);

  return {
    props: {
      numberOfTerms,
      numberOfLanguages,
      numberOfContributors,
      atmosphericReadings,
      // result,
      feed,
    },
    revalidate: 10,
  };
};

type Props = {
  numberOfTerms: string;
  numberOfLanguages: string;
  numberOfContributors: string;
  atmosphericReadings: TermProps[];
  // result: TermProps[];
  feed: TermProps[];
  group: string;
};

const Home: React.FC<Props> = (props) => {
  // console.log(props);
  // const checkRoleExistence = (roleParam) =>
  //   roles.some(({ role }) => role == roleParam);
  //
  return (
    <Layout>
      {/* Hero */}

      <div className="py-24">
        <div className="text-h4 sm:text-h3 md:text-h1  font-bold">
          A shared source of truth to build a better future.
        </div>

        <div className="text-h4 sm:text-h3 md:text-h2">
          As awareness of the cliamte crysis increases, so does the noise and
          origin of informaiton. We are working to make a glossary of terms,
          agreements, companies, orginizations and more.
        </div>
      </div>

      {/* Atmospheric Readings */}
      <div className="py-24 rounded flex flex-wrap justify-between">
        <div className="">GA GHG:</div>
        <div className="">
          <Link href="https://api.madefor.earth/data/ch4">
            <div
              id="widget-for-ch4-today-source-glossary"
              className="umami--click--widget-for-ch4-today-source-glossary"
            >
              {!props.atmosphericReadings[0].ch4 ? (
                <>Loading CH₄</>
              ) : (
                <>
                  CH₄ {props.atmosphericReadings[0].ch4.measurement}{" "}
                  <span>↗</span>
                </>
              )}
            </div>
          </Link>
        </div>
        <div className="">
          <Link href="https://api.madefor.earth/data/co2">
            <div
              id="widget-for-co2-today-source-glossary"
              className="umami--click--widget-for-co2-today-source-glossary"
            >
              {!props.atmosphericReadings[1].co2 ? (
                <>Loading CO₂</>
              ) : (
                <>
                  CO₂ {props.atmosphericReadings[1].co2.measurement}{" "}
                  <span>↗</span>
                </>
              )}
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="https://api.madefor.earth/data/n2o">
            <div
              id="widget-for-n2o-today-source-glossary"
              className="umami--click--widget-for-n2o-today-source-glossary"
            >
              {!props.atmosphericReadings[2].n2o ? (
                <>Loading N₂O</>
              ) : (
                <>
                  N₂O {props.atmosphericReadings[2].n2o.measurement}{" "}
                  <span>↗</span>
                </>
              )}
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="https://api.madefor.earth/data/sf6">
            <div
              id="widget-for-sf6-today-source-glossary"
              className="umami--click--widget-for-sf6-today-source-glossary"
            >
              {!props.atmosphericReadings[3].sf6 ? (
                <>Loading SF₆</>
              ) : (
                <>
                  SF₆ {props.atmosphericReadings[3].sf6.measurement}{" "}
                  <span>↗</span>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Search By */}
      <div className="bg-red-300">
        <div className="text-h4 sm:text-h3 md:text-h2 font-bold lowercase ">
          search by
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3">
            As awareness of the cliamte crysis increases, so does the noise and
            origin of informaiton.
            <br /> <br />
            We are working to make a glossary of terms, agreements, companies,
            orginizations and more.
          </div>

          <div className="">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      </div>

      {/* missing something? */}
      <div className="py-24">
        <div className="text-h4 sm:text-h3 md:text-h2 font-bold lowercase">
          missing something?
        </div>

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3">
            We take seggestions from our community and verify them before adding
            them to the glossary, Anyone can recommend a term via this{" "}
            <Link href="https://form.typeform.com/to/lowIfjl5">
              <div className="underline underline-offset-2">tiny form ↗</div>
            </Link>
            .
          </div>

          <div className="">image?</div>
        </div>
      </div>

      {/* translation */}
      <div className="py-24">
        <div className="text-h4 sm:text-h3 md:text-h2 font-bold lowercase">
          glossary translation
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3">
            since the climate crysis is a global issue we are working on
            translting our glossary into multiple launguages with context
            specific examples for given regions.
            https://form.typeform.com/to/hV9yuh6J
          </div>
        </div>
      </div>

      {/* by the numbers */}
      <div className="py-24 ">
        <div className="text-h4 sm:text-h3 md:text-h2 font-bold lowercase">
          by the numbers
        </div>

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3">
            As awareness of the cliamte crysis increases, so does the noise and
            origin of informaiton. We are working to make a glossary of terms,
            agreements, companies, orginizations and more.
          </div>
          <div className="w-full sm:w-1/3 "></div>

          <div className="w-full sm:w-1/3 ">
            <div className="">
              {" "}
              <div className="text-h4 sm:text-h3 md:text-h1  font-bold block">
                {props.numberOfTerms}
              </div>
              <div className="block">glossary terms</div>
            </div>

            <div className="">
              {" "}
              <div className="text-h4 sm:text-h3 md:text-h1  font-bold block">
                {props.numberOfContributors}
              </div>
              <div className="block">contrinutors</div>
            </div>

            <div className="">
              {" "}
              <div className="text-h4 sm:text-h3 md:text-h1  font-bold block">
                {props.numberOfLanguages}
              </div>
              <div className="block">languages</div>
            </div>
          </div>
        </div>
      </div>

      {/* you made it*/}
      <div className="py-24">
        <div className="text-h4 sm:text-h3 md:text-h2 font-bold lowercase">
          you made it to the bottom!
        </div>

        <div className="">
          give you self a{" "}
          <Link href="#">
            <div className="underline underline-offset-2">🖐️</div>
          </Link>{" "}
          and learn a{" "}
          <Link href="#">
            <div className="underline underline-offset-2">new cliamte term</div>
          </Link>
        </div>
      </div>

      {/* <div className="w-full mb-9 sm:py-9 text-h4 sm:text-h3 md:text-h1 font-sans">

        <div>
          <div className="flex w-full justify-between hover:bold">
            {props.result
              .sort(function (a, b) {
                if (a.group < b.group) {
                  return -1;
                }
                if (a.group > b.group) {
                  return 1;
                }
                return 0;
              })
              .map((term, index) => (
                <div className="" key={index}>
                  <Link href={`/terms#${term.group}`}>
                    <div className="inline-block  text-gray-500 font-satoshi hover:font-bold">
                      {term.group}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Home;
