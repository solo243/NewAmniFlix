const BaseUrl = `https://cloud.syncloop.com/tenant/borrorw/`;

const apicall = async (endpoint) => {
  let UpdateToken = await fetch(
    `https://64cbcf1f2eafdcdc851958af.mockapi.io/api/V1/Movie/token`
  );
  let hh = await UpdateToken.json();
  let fet = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${hh[0].id}`,
      "Content-Type": "application/json",
    },
  });
  let rr = await fet.json();
  let data = rr;
  return data;
};

export const fetchgogorecent = (page) => {
  const updatedgogourl = `${BaseUrl}packages.user.wrapper.api.RecentAnime.main`;
  return apicall(updatedgogourl);
};

export const gogotopair = (page) => {
  const updatedgogourl = `${BaseUrl}packages.user.wrapper.api.TrendingAnime.main?page=${page}`;
  return apicall(updatedgogourl);
};

export const gogoinfo = (id) => {
  const updatedgogourl = `${BaseUrl}packages.user.wrapper.api.Cosmet.main?id=${id}`;
  return apicall(updatedgogourl);
};

export const NewsFetch = () => {
  const Updatedurl = `${BaseUrl}packages.user.wrapper.api.NewFeed.main`;
  return apicall(Updatedurl);
};

export const Newsinfo = (id) => {
  const Updatedurl = `${BaseUrl}packages.user.wrapper.api.NewsDetails.main?id=${id}`;
  return apicall(Updatedurl);
};
