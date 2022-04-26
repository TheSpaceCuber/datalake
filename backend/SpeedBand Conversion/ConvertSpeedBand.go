package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type speedband struct {
	Value []struct {
		LinkID       int
		RoadName     string
		RoadCategory string
		SpeedBand    int
		MinimumSpeed string
		MaximumSpeed string
		Location     string
	}
}

type sample struct {
	Type     string    `json:"type"`
	Features []Feature `json:"features"`
}

type Feature struct {
	Geometry struct {
		Type        string      `json:"type"`
		Coordinates [][]float64 `json:"coordinates"`
	} `json:"geometry"`
	Type       string `json:"type"`
	Properties struct {
		Level int
	} `json:"properties"`
}

func main() {
	samples, err := os.ReadFile("sample.json")
	if err != nil {
		panic(err)
	}

	temp := sample{}
	json.Unmarshal(samples, &temp)
	// fmt.Print(temp)

	speed, err := os.ReadFile("speedband.json")
	if err != nil {
		panic(err)
	}
	temp1 := speedband{}
	json.Unmarshal(speed, &temp1)
	fmt.Println(temp1.Value[0])

	empty := sample{
		Type:     "Congestion Layer",
		Features: []Feature{},
	}

	for _, data := range temp1.Value {
		tempp := Feature{}
		tempp.Geometry.Type = "LineString"

		strLocation := strings.Split(data.Location, " ")
		floatLocation := []float64{}
		for i := 0; i < 4; i++ {
			f, _ := strconv.ParseFloat(strLocation[i], 64)
			floatLocation = append(floatLocation, f)
		}
		a := []float64{
			floatLocation[1], floatLocation[0], 0.0,
		}
		b := []float64{
			floatLocation[3], floatLocation[2], 0.0,
		}
		tempp.Geometry.Coordinates = [][]float64{
			a, b,
		}

		tempp.Type = "Feature"
		tempp.Properties = struct{ Level int }{data.SpeedBand}
		empty.Features = append(empty.Features, tempp)
	}
	fmt.Print(empty)
	n, _ := json.Marshal(empty)
	os.WriteFile("sample1.json", n, 0644)
}
