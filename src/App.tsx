import React, { useState } from "react";
import { Button, Col, DatePicker, Input, Select, Row } from "antd";
import { RewardPayload, RewardType } from "./types";
import { HOUR_MS } from "./constants";
import dayjs, { Dayjs } from "dayjs";
import "./App.css";

function App() {
  const [payload, setPayload] = useState<RewardPayload>({
    id: "",
    rewards: [],
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Payload Creator</h2>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>ID</label>
        </Col>
        <Col span={16}>
          <Input
            value={payload.id}
            onChange={(e) => {
              setPayload({
                ...payload,
                id: e.target.value,
              });
            }}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>Expiry Date (UTC)</label>
        </Col>
        <Col span={16}>
          <DatePicker
            value={payload.expireAt ? dayjs(payload.expireAt) : null}
            onChange={(value: Dayjs | null) => {
              if (value) {
                setPayload({
                  ...payload,
                  expireAt: value.toDate().getTime(),
                });
              } else {
                const { expireAt, ...newPayload } = payload;
                setPayload(newPayload);
              }
            }}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>Cooldown (hours)</label>
        </Col>
        <Col span={16}>
          <Input
            type="number"
            value={payload.cooldown ? payload.cooldown / HOUR_MS : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              if (isNaN(value)) {
                const { cooldown, ...newPayload } = payload;
                setPayload(newPayload);
              } else {
                setPayload({
                  ...payload,
                  cooldown: parseFloat(e.target.value) * HOUR_MS,
                });
              }
            }}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>Rewards</label>
        </Col>
        <Col span={16}>
          {payload.rewards.map((reward, index) => (
            <Row key={index} gutter={[8, 8]}>
              <Col span={12}>
                <Select
                  value={reward.type}
                  options={Object.values(RewardType).map((type) => {
                    return { value: type };
                  })}
                  onChange={(type) => {
                    setPayload({
                      ...payload,
                      rewards: payload.rewards.map((reward, i) => {
                        return i === index
                          ? {
                              ...reward,
                              type,
                            }
                          : reward;
                      }),
                    });
                  }}
                  placeholder="Reward Type"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={8}>
                <Input
                  type="number"
                  value={reward.amount}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      rewards: payload.rewards.map((reward, i) => {
                        return i === index
                          ? {
                              ...reward,
                              amount: parseInt(e.target.value),
                            }
                          : reward;
                      }),
                    });
                  }}
                  placeholder="Reward Value"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={4}>
                <Button
                  type="default"
                  onClick={() => {
                    setPayload({
                      ...payload,
                      rewards: payload.rewards.filter((reward, i) => {
                        return i !== index;
                      }),
                    });
                  }}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            type="primary"
            onClick={() => {
              setPayload({
                ...payload,
                rewards: [
                  ...payload.rewards,
                  { type: RewardType.Bomb, amount: 0 },
                ],
              });
            }}
          >
            Add Reward
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
