/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Flex, Image, Box } from 'rebass';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import css from 'css/Characters.module.css';

const characters = () => {
  const [chars, setChars] = useState([]);
  const [sortedChars, setSortedChars] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (chars.length >= 63) {
      setHasMore(false);
      return;
    }

    const res = axios.get(`https://www.breakingbadapi.com/api/characters?limit=6&offset=${sort ? sortedChars.length : chars.length || 0}`)
      
    res.then(res => {
      sort ? setSortedChars([...sortedChars, ...res.data]) : setChars([...chars, ...res.data])
    }).catch(err => {
      setError(err);
    })
  }
  
  const sortChars = key => {
    if (key === 'name' && !sort) {
      setSortedChars(chars.sort((a, b) => (a.name > b.name) ? 1 : -1));

      setSort(true);
    };

    if (key === 'name' && sort) {
      setSortedChars(sortedChars.sort((a, b) => (a.name > b.name) ? 1 : -1))
    }
  }

  const sorted = sort ? sortedChars : chars;

  return (
    <div className={css.Characters__Container}>
      <h1>Characters</h1>

      {
        error ?
          <h1>ERROR: { error }</h1>
        :
          <React.Fragment>
            <Flex width={11/12}>
              <Box onClick={() => sortChars('name')} width={1/4} className={css.Btn}>
                Sort By Name
              </Box>
              <Box onClick={() => sortChars('birthday')} width={1/4} className={css.Btn}>
                Sort by Birthday
              </Box>
              <Box onClick={() => sortChars('portrayer')} width={1/4} className={css.Btn}>
                Sort by Portrayed
              </Box>
            </Flex>
            <InfiniteScroll
              dataLength={sorted.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h3>L O A D I N G . . .</h3>}
              endMessage={
                <p>
                  Nothing to see here! It's all.
                </p>
              }>
              <Flex 
                width={1}
                flexWrap="wrap"
                mx="auto"
                justifyContent="center"
                alignItems="center">
                {
                  sorted.map((c, i) => (
                    <Flex
                      alignItems="center"
                      justifyContent="flex-start"
                      width={[11/12, 5 / 12, 3 / 12]}
                      m={1}
                      key={c.char_id}
                      className={css.Character__Item}>
                      <Flex width={1/2}
                        className={css.Character_Item__Img_Container}
                        alignItems="center"
                        justifyContent="center">
                        <Image src={c.img}
                          sx={{
                            width: 'auto',
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '100%',
                            backgroundOrigin: 'border-box',
                            backgroundSize: 'contain',
                          }} />
                      </Flex>
                      <Flex width={1/2}
                        className={css.Character_Item__Content}
                        alignItems="center"
                        justifyContent="flex-start"
                        flexDirection="column">
                        <Box as="h3"
                          className={css.Char__Title}
                          width={1}>
                          {c.name}
                        </Box>
                        <Box width={1} className={css.Char__Key}>
                          Occupations:
                          <Flex
                            flexWrap="wrap"
                            alignItems="center"
                            justifyContent="flex-start">
                            {
                              c.occupation.map((o, i) => (
                                <p className={css.Char__Occupation} key={i}>{ o }</p>
                              ))
                            }
                          </Flex>
                        </Box>
                        <Box width={1} as="p" className={css.Char__Key}> 
                          Birthday: <span>{ c.birthday }</span>
                        </Box>
                        <Box width={1} as="p" className={css.Char__Key}>
                          Status: <span>{ c.status }</span>
                        </Box>
                        <Box width={1} as="p" className={css.Char__Key}>
                          Portrayed: <span>{ c.portrayed }</span>
                        </Box>
                      </Flex>
                    </Flex>
                  ))
                }
              </Flex>
            </InfiniteScroll>
          </React.Fragment>
      }
    </div>
  )
}

export default characters;