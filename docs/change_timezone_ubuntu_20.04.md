# How to change timezone on Ubuntu 20.04 Focal Fossa Linux

Step 1: Check your current time zone settings.
```
$ timedatectl
               Local time: Thu 2019-12-05 23:22:43 UTC
           Universal time: Thu 2019-12-05 23:22:43 UTC
                 RTC time: Thu 2019-12-05 23:22:43
                Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: no
              NTP service: inactive
          RTC in local TZ: no
```

Step 2: List available time zones.
```
$ timedatectl list-timezones
```

Use the `grep` command to narrow down the search. For example, to produce a list of all available time zones in `Singapore`:
```
$ timedatectl list-timezones | grep Singapore
Asia/Singapore
```

Step 3: Set time zone.
```
$ sudo timedatectl set-timezone Asia/Singapore
```

Step 4: All done. Confirm the correct time zone settings.
```
$ timedatectl
               Local time: Mon 2020-09-07 18:16:48 +08
           Universal time: Mon 2020-09-07 10:16:48 UTC
                 RTC time: Mon 2020-09-07 10:16:47
                Time zone: Asia/Singapore (+08, +0800)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
```
