<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-top">
      <h3 class="title font-weight-regular">
        Organization Information
      </h3>
    </v-card-text>
    <v-card-text>
      <v-text-field
        v-model="companyName"
        label="Company/orgainzation name"
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="siteUrl"
        label="Website URL"
        background-color="transparent"
      ></v-text-field>
      <v-text-field
        v-model="address"
        label="Address"
        background-color="transparent"
      ></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="city"
            label="City"
            background-color="transparent"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Country"
            item-text="name"
            item-value="code"
            v-model="country"
            @change="changeCountry"
            :items="countryData"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="pa-5 border-top">
      <h3 class="title font-weight-regular">
        Time Zone
      </h3>
      <h4>Current time in time zone: {{ dateTimeUtc }}</h4>
      <v-select
        item-text="label"
        item-value="value"
        v-model="defaultTimeZone"
        :items="timezoneData"
        @change="changeTimeZone"
      />
    </v-card-text>
    <v-card-text>
      <div class="d-flex align-baseline">
        <v-btn
          class="text-capitalize mt-5 element-0"
          color="success"
          @click="submit"
          >Save</v-btn
        >&nbsp; or &nbsp;
        <a
          href="#"
          @click="$router.go(-1)"
          class="text-decoration-underline grey--text text--darken-1"
          >Go back</a
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
const moment = require("moment-timezone");

const timezonArr = [
  { value: "Etc/GMT+12", label: "International Date Line West" },
  { value: "Pacific/Midway", label: "Midway Island, Samoa" },
  { value: "Pacific/Honolulu", label: "Hawaii" },
  { value: "America/Juneau", label: "Alaska" },
  { value: "America/Dawson", label: "Pacific Time (US and Canada); Tijuana" },
  { value: "America/Boise", label: "Mountain Time (US and Canada)" },
  { value: "America/Chihuahua", label: "Chihuahua, La Paz, Mazatlan" },
  { value: "America/Phoenix", label: "Arizona" },
  { value: "America/Chicago", label: "Central Time (US and Canada)" },
  { value: "America/Regina", label: "Saskatchewan" },
  {
    value: "America/Mexico_City",
    label: "Guadalajara, Mexico City, Monterrey"
  },
  { value: "America/Belize", label: "Central America" },
  { value: "America/Detroit", label: "Eastern Time (US and Canada)" },
  { value: "America/Indiana/Indianapolis", label: "Indiana (East)" },
  { value: "America/Bogota", label: "Bogota, Lima, Quito" },
  { value: "America/Glace_Bay", label: "Atlantic Time (Canada)" },
  { value: "America/Caracas", label: "Caracas, La Paz" },
  { value: "America/Santiago", label: "Santiago" },
  { value: "America/St_Johns", label: "Newfoundland and Labrador" },
  { value: "America/Sao_Paulo", label: "Brasilia" },
  {
    value: "America/Argentina/Buenos_Aires",
    label: "Buenos Aires, Georgetown"
  },
  { value: "America/Godthab", label: "Greenland" },
  { value: "Etc/GMT+2", label: "Mid-Atlantic" },
  { value: "Atlantic/Azores", label: "Azores" },
  { value: "Atlantic/Cape_Verde", label: "Cape Verde Islands" },
  { value: "GMT", label: "Dublin, Edinburgh, Lisbon, London" },
  { value: "Africa/Casablanca", label: "Casablanca, Monrovia" },
  { value: "Atlantic/Canary", label: "Canary Islands" },
  {
    value: "Europe/Belgrade",
    label: "Belgrade, Bratislava, Budapest, Ljubljana, Prague"
  },
  { value: "Europe/Sarajevo", label: "Sarajevo, Skopje, Warsaw, Zagreb" },
  { value: "Europe/Brussels", label: "Brussels, Copenhagen, Madrid, Paris" },
  {
    value: "Europe/Amsterdam",
    label: "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
  },
  { value: "Africa/Algiers", label: "West Central Africa" },
  { value: "Europe/Bucharest", label: "Bucharest" },
  { value: "Africa/Cairo", label: "Cairo" },
  {
    value: "Europe/Helsinki",
    label: "Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius"
  },
  { value: "Europe/Athens", label: "Athens, Istanbul, Minsk" },
  { value: "Asia/Jerusalem", label: "Jerusalem" },
  { value: "Africa/Harare", label: "Harare, Pretoria" },
  { value: "Europe/Moscow", label: "Moscow, St. Petersburg, Volgograd" },
  { value: "Asia/Kuwait", label: "Kuwait, Riyadh" },
  { value: "Africa/Nairobi", label: "Nairobi" },
  { value: "Asia/Baghdad", label: "Baghdad" },
  { value: "Asia/Tehran", label: "Tehran" },
  { value: "Asia/Dubai", label: "Abu Dhabi, Muscat" },
  { value: "Asia/Baku", label: "Baku, Tbilisi, Yerevan" },
  { value: "Asia/Kabul", label: "Kabul" },
  { value: "Asia/Yekaterinburg", label: "Ekaterinburg" },
  { value: "Asia/Karachi", label: "Islamabad, Karachi, Tashkent" },
  { value: "Asia/Kolkata", label: "Chennai, Kolkata, Mumbai, New Delhi" },
  { value: "Asia/Kathmandu", label: "Kathmandu" },
  { value: "Asia/Dhaka", label: "Astana, Dhaka" },
  { value: "Asia/Colombo", label: "Sri Jayawardenepura" },
  { value: "Asia/Almaty", label: "Almaty, Novosibirsk" },
  { value: "Asia/Rangoon", label: "Yangon Rangoon" },
  { value: "Asia/Bangkok", label: "Bangkok, Hanoi, Jakarta" },
  { value: "Asia/Krasnoyarsk", label: "Krasnoyarsk" },
  {
    value: "Asia/Shanghai",
    label: "Beijing, Chongqing, Hong Kong SAR, Urumqi"
  },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur, Singapore" },
  { value: "Asia/Taipei", label: "Taipei" },
  { value: "Australia/Perth", label: "Perth" },
  { value: "Asia/Irkutsk", label: "Irkutsk, Ulaanbaatar" },
  { value: "Asia/Seoul", label: "Seoul" },
  { value: "Asia/Tokyo", label: "Osaka, Sapporo, Tokyo" },
  { value: "Asia/Yakutsk", label: "Yakutsk" },
  { value: "Australia/Darwin", label: "Darwin" },
  { value: "Australia/Adelaide", label: "Adelaide" },
  { value: "Australia/Sydney", label: "Canberra, Melbourne, Sydney" },
  { value: "Australia/Brisbane", label: "Brisbane" },
  { value: "Australia/Hobart", label: "Hobart" },
  { value: "Asia/Vladivostok", label: "Vladivostok" },
  { value: "Pacific/Guam", label: "Guam, Port Moresby" },
  { value: "Asia/Magadan", label: "Magadan, Solomon Islands, New Caledonia" },
  { value: "Pacific/Fiji", label: "Fiji Islands, Kamchatka, Marshall Islands" },
  { value: "Pacific/Auckland", label: "Auckland, Wellington" },
  { value: "Pacific/Tongatapu", label: "Nuku'alofa" }
];

var country_list = [
  { name: "Afghanistan", code: "AF" },
  { name: "land Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'sIvoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People's Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People's Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" }
];

export default {
  name: "CompanyProfile",
  data: () => ({
    companyName: "Prospect Role",
    siteUrl: "https://prospectrole.com",
    address: "Rue de I'Ale",
    city: "Lausanne",
    country: "CH",
    defaultTimeZone: "America/Chicago",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    timezoneData: timezonArr,
    dateTimeUtc: moment()
      .tz("America/Chicago")
      .format("ddd, DD MMM YYYY HH:mm:ss"),
    countryData: country_list
  }),
  methods: {
    changeTimeZone(selectObj) {
      this.dateTimeUtc = moment()
        .tz(selectObj)
        .format("ddd, DD MMM YYYY HH:mm:ss");
    },
    changeCountry(seleted) {
      console.log("seleted country", seleted);
    },
    submit() {
      if (this.country !== "AF") this.$emit("handleSuccessSnackBar", true);
      else this.$emit("handleErrorSnackBar", true);
    }
  }
};
</script>
