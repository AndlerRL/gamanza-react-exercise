/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Box, Text } from 'rebass';

import css from 'css/Characters.module.css';

const deaths = () => {
  const [deaths, setDeaths] = useState([]);
  const [td, setTD] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const res = axios.get(`https://www.breakingbadapi.com/api/deaths?limit=5&offset=0`)
      
    res.then(res => {
      setDeaths([...res.data.splice(0, 5)]);
      setTD(res.data.length);
    }).catch(err => {
      setError(err);
    })
  }

  return (
    <React.Fragment>
      <h1>Deaths</h1>
      <h2>Total Deaths: { td }</h2>
      <Flex
        flexDirection="column"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        width={10 / 12}>
        {
          error ?
            <h1>ERROR: { error } </h1>
          :
            deaths.map(d => (
              <Flex 
                flexDirection="column"
                width={1}
                alignItems="center"
                justifyContent="flex-start"
                className={css.Death__Item}
                my={3}
                key={d.death_id}>
                <Text as="h2">
                  Death by: { d.death }
                </Text>
                <Box as="hr" width={10/12} my={3}></Box>
                <Box p={5} width={1}>
                  <Text as="p" width={1}>
                    Death Cause: {d.cause}
                  </Text>
                  <Text as="p" width={1}>
                    Responsible: {d.responsible}
                  </Text>
                  <Text as="p" width={1}>
                    Last words: {d.last_words}
                  </Text>
                </Box>
              </Flex>
            ))
        }
      </Flex>
    </React.Fragment>
  )
}

export default deaths;