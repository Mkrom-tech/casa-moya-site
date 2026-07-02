#!/bin/bash
cd "$(dirname "$0")/../public/images"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
REFERER="https://www.airbnb.com/"

MORAIRA_IDS=(
  caa21620-8466-4325-9508-87ea7f9f449b
  7ec8a992-a5e5-40f1-b6a9-324c30e43441
  7ed28d1b-8523-47a5-9b07-3c8cfb770ebe
  9b798e45-035e-4a95-92c0-397f4acf7786
  0002f5bb-5e8f-4ec2-8b6f-a453b69d71e2
  7b0d0f50-abce-4bf6-a01e-02ecbf51ed9c
  4ca48887-f1d0-431a-b0e5-85711fb73446
  d8e89987-013f-43fc-bb34-4197a87fbfb3
  83235eb2-d7ce-469a-b1a4-db13e775da8d
  59b3e3af-4996-4bcf-a333-fc8ff827174b
  5da03412-2a95-4499-bd59-457c48f0d11e
  b9982d70-0e19-411b-900e-89c79a4bb120
  9a231c60-59a5-4227-a65b-eb780133ffc4
  594d31b1-a2c9-4581-9437-b7a845a7f4da
  9e666d2b-2328-4d97-abb9-4ee4f388306b
  f513075c-fb0c-46cc-be80-cac262193305
  ff6fce2c-eab8-4968-b91f-4cee1d8f50a8
  70300610-a2f5-4eb6-9686-711b2b402357
  7d318c36-3a05-40e9-a754-f702cb26b868
  97b121e6-59a5-4c71-b1a8-2dba366049e1
  d4ad8686-6e91-4c52-8fbb-04ad5811de08
  05471ce8-2099-4ca1-8317-7606007506bd
  3b90dfe3-909f-4aa5-8071-3ced5fd68d20
  04d07e78-0e22-4b4f-8cb2-70c0787df62b
  911a459a-b9f0-4256-9e04-8226a733e513
  dd18fd7d-3b2d-4886-9168-6dce0e359e76
  9b50286c-b382-4729-a139-30c13e47bbc0
  4b0d887e-59f2-43b8-9e98-57428e581e75
)

DENIA_IDS=(
  d895087e-2954-46af-934c-552294929f6d
  8f6a9811-b79f-499b-ae74-0a5ed59ec26e
  5e27f606-4158-4820-a068-ab4b8d06b1fe
  30d3c6cf-e79a-48d7-b3a9-c61857fdec70
  7527d468-76a3-435b-b5b3-70a84b6fe88d
  14cca39e-8270-41ee-b352-3a9a463a3bbf
  eed2fded-7aec-4ae4-8704-cf0f0d23c36e
  b30e9700-b294-41f9-aac9-40fb910523ac
  8dc520a7-88e2-4d00-bc57-6366d747a235
  9ab18b63-ab36-435f-aabc-88f3c6576e31
  d0f2fc1f-b41d-42e6-b365-fab51e77e62e
  00190976-9a37-4e4f-8cbc-ec0eb111b18f
  3ce5f92e-2970-4fbc-a1b6-61ab03f89ffa
  5d595ff5-ccde-4aa5-bd5e-8674c51f42b7
  df3a0a60-9dd9-44e6-a123-ee86c3793fb1
  2aeb0d8b-153b-4949-913e-4e5b8395a02c
  bcc3a93e-21d1-4dee-b23d-63d336fdf90b
  86cdd02f-58d9-4f26-bc43-d3769f77d021
  44972482-30d0-4221-8b50-5075f2864b91
  a41b5b15-3a36-495e-ac25-c4330f61f17a
  47cf595f-a3ec-43e0-9953-d6fdee45cfec
  21e8b08c-b119-4408-a8c6-1107d97012ff
  72eb522c-8933-4e8b-87d3-b2ac3d0f78fb
  e12f2a1c-736b-4d5e-b6e5-650a6dd19ef3
)

download_one() {
  local url="$1"
  local out="$2"
  local attempt
  for attempt in 1 2 3 4 5; do
    curl -fsL -A "$UA" -e "$REFERER" -o "$out" "$url" && [ "$(wc -c < "$out")" -gt 5000 ] && return 0
    sleep 1
  done
  echo "MISLUKT: $out"
  return 1
}

echo "Downloading Moraira photos..."
i=1
for id in "${MORAIRA_IDS[@]}"; do
  download_one "https://a0.muscache.com/im/pictures/miso/Hosting-53103651/original/${id}.jpeg?im_w=1200" "moraira-${i}.jpg"
  i=$((i+1))
  sleep 0.3
done

echo "Downloading Denia photos..."
i=1
for id in "${DENIA_IDS[@]}"; do
  download_one "https://a0.muscache.com/im/pictures/miso/Hosting-1118123648822104746/original/${id}.jpeg?im_w=1200" "denia-${i}.jpg"
  i=$((i+1))
  sleep 0.3
done

echo "Klaar: $(ls moraira-*.jpg | wc -l) Moraira-foto's, $(ls denia-*.jpg | wc -l) Denia-foto's gedownload."
echo "(script slaat automatisch bestaande goede foto's over)"
echo ""
echo "Controle op mislukte downloads (kleiner dan 5 KB):"
find . -maxdepth 1 \( -name "moraira-*.jpg" -o -name "denia-*.jpg" \) -size -5k -print
