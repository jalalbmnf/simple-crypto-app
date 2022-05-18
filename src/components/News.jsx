import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import {Loader } from '../components'
import {useGetCryptosQuery} from '../services/cryptoApi'
import { useGetNewsQuery } from "../services/cryptoNewsApi";


const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const demoImage = "../assets/images/news.jpeg";

  const [newsCategory,setNewsCategory] = useState('Cryptocurrency');
  const {data} = useGetCryptosQuery(100);


  const { data: news, isFetching } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!news?.value || isFetching) return <Loader/>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency" >Cryptocurrency</Option>
            {data?.data?.coins?.map(coin=>(
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {news?.value?.map((item, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={item.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {item.name}
                </Title>
                <img
                  src={item?.image?.thumbnail?.contentUrl || demoImage}
                  alt={item.name}
                />
              </div>
              <p>
                {item.description > 70
                  ? `${item.description.substring(0, 70)}...`
                  : item.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      item.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt={item.provider[0]?.name}
                  />
                  <Text className="provider-name">
                    {item?.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(item.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
