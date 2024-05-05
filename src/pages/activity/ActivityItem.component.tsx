import { Grid, Stack, Text } from "@mantine/core";
import React from "react";
import dummy6 from "../../assets/images/dummy6.jpg";

export interface IActivityItem {}

const ActivityItem: React.FC<IActivityItem> = ({}) => {
  return (
    <Grid className="">
      <Grid.Col span={2}>
        <Stack>
          <Text className="text-start">6 Mei 2024</Text>
          <Text className="text-start">16 Aktivitas Peminjaman</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={10}>
        <Stack className="gap-8">
          <div className="pl-2 bg-gradient-to-b from-dark-red via-red to-light-red rounded-lg">
            <Grid
              gutter={0}
              className="bg-white border-secondary border rounded-r-lg shadow-xl"
            >
              <Grid.Col span={10}>
                <Stack className="px-4 py-4">
                  <Text className="text-start text-primary-text">
                    <span className="text-2xl font-poppins-semibold mr-2">
                      H071191044
                    </span>
                    <span className="text-red font-poppins-semibold">
                      meminjam
                    </span>{" "}
                    1 proyektor
                  </Text>
                  <Stack className="gap-1">
                    <Grid>
                      <Grid.Col span={6}>
                        <Stack className="gap-1">
                          <Text className="text-start text-primary-text">
                            Waktu peminjaman: 11:00
                          </Text>
                          <Text className="text-start text-primary-text">
                            Nama Ruangan: PBT 303
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Stack className="gap-1">
                          <Text className="text-start text-primary-text">
                            Ekspektasi waktu pengembalian: 18:00{" "}
                          </Text>
                          <Text className="text-start text-primary-text">
                            Waktu pengembalian: 18:00 (Terlambat)
                          </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                    <Text className="text-start text-primary-text">
                      Keterangan Tambahan: Lorem, ipsum dolor sit amet
                      consectetur adipisicing elit. Dolore, quia?
                    </Text>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col span={2} className="p-2">
                <div className="w-full h-full rounded-lg">
                  <img
                    src={dummy6}
                    alt="Gambar Item"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Grid.Col>
            </Grid>
          </div>
          <div className="pl-2 bg-gradient-to-b from-green to-light-green rounded-lg">
            <Grid
              gutter={0}
              className="bg-white border-secondary border rounded-r-lg shadow-xl"
            >
              <Grid.Col span={10}>
                <Stack className="px-4 py-4">
                  <Text className="text-start text-primary-text">
                    <span className="text-2xl font-poppins-semibold mr-2">
                      H071191044
                    </span>
                    <span className="text-green font-poppins-semibold">
                      mengembalikan
                    </span>{" "}
                    1 mobil
                  </Text>
                  <Stack className="gap-1">
                    <Grid>
                      <Grid.Col span={6}>
                        <Stack className="gap-1">
                          <Text className="text-start text-primary-text">
                            Waktu peminjaman: 11:00
                          </Text>
                          <Text className="text-start text-primary-text">
                            Nama Ruangan: PBT 303
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Stack className="gap-1">
                          <Text className="text-start text-primary-text">
                            Ekspektasi waktu pengembalian: 18:00{" "}
                          </Text>
                          <Text className="text-start text-primary-text">
                            Waktu pengembalian: 18:00 (Terlambat)
                          </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                    <Text className="text-start text-primary-text">
                      Keterangan Tambahan: Lorem, ipsum dolor sit amet
                      consectetur adipisicing elit. Dolore, quia?
                    </Text>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col span={2} className="p-2">
                <div className="w-full h-full rounded-lg">
                  <img
                    src={dummy6}
                    alt="Gambar Item"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default ActivityItem;
